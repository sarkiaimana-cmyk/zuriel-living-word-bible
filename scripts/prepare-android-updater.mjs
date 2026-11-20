import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";

const androidRoot = join(process.cwd(), "android");
const manifestPath = join(androidRoot, "app/src/main/AndroidManifest.xml");

async function findFile(dir, pattern) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = await findFile(full, pattern);
      if (found) return found;
    } else if (pattern.test(entry.name)) return full;
  }
  return null;
}

const activityPath = await findFile(join(androidRoot, "app/src/main/java"), /^MainActivity\.(kt|java)$/);
if (!activityPath) throw new Error("Capacitor MainActivity was not found.");
const activity = await readFile(activityPath, "utf8");
const packageMatch = activity.match(/^package\s+([A-Za-z0-9_.]+)/m);
if (!packageMatch) throw new Error("Could not read the Android package name.");
const packageName = packageMatch[1];
const pluginPath = join(androidRoot, "app/src/main/java", ...packageName.split("."), "ZurielUpdaterPlugin.java");
await mkdir(dirname(pluginPath), { recursive: true });

const java = [
  "package " + packageName + ";",
  "",
  "import android.content.Intent;",
  "import android.net.Uri;",
  "import android.os.Build;",
  "import androidx.core.content.FileProvider;",
  "import com.getcapacitor.JSObject;",
  "import com.getcapacitor.Plugin;",
  "import com.getcapacitor.PluginCall;",
  "import com.getcapacitor.PluginMethod;",
  "import com.getcapacitor.annotation.CapacitorPlugin;",
  "import java.io.File;",
  "import java.io.FileOutputStream;",
  "import java.io.InputStream;",
  "import java.net.HttpURLConnection;",
  "import java.net.URL;",
  "import java.security.MessageDigest;",
  "",
  "@CapacitorPlugin(name = \"ZurielUpdater\")",
  "public class ZurielUpdaterPlugin extends Plugin {",
  "  @PluginMethod",
  "  public void installUpdate(PluginCall call) {",
  "    final String downloadUrl = call.getString(\"url\");",
  "    final String expectedHash = call.getString(\"sha256\");",
  "    if (downloadUrl == null || expectedHash == null || !expectedHash.matches(\"(?i)^[a-f0-9]{64}$\")) {",
  "      call.reject(\"The official update address or SHA-256 integrity check is missing or invalid.\");",
  "      return;",
  "    }",
  "    try {",
  "      URL parsed = new URL(downloadUrl);",
  "      if (!\"https\".equals(parsed.getProtocol()) || !trustedHost(parsed.getHost())) {",
  "        call.reject(\"Zuriel only accepts official HTTPS GitHub release downloads.\");",
  "        return;",
  "      }",
  "    } catch (Exception error) { call.reject(\"The official update address is invalid.\", error); return; }",
  "    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && !getContext().getPackageManager().canRequestPackageInstalls()) {",
  "      try {",
  "        Intent settings = new Intent(android.provider.Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse(\"package:\" + getContext().getPackageName()));",
  "        getActivity().startActivity(settings);",
  "        call.resolve(new JSObject().put(\"needsPermission\", true));",
  "      } catch (Exception error) { call.reject(\"Android could not open the permission needed for an update.\", error); }",
  "      return;",
  "    }",
  "    new Thread(() -> downloadAndOpen(call, downloadUrl, expectedHash.toLowerCase())).start();",
  "  }",
  "",
  "  private boolean trustedHost(String host) {",
  "    return \"github.com\".equalsIgnoreCase(host) || \"objects.githubusercontent.com\".equalsIgnoreCase(host) || \"release-assets.githubusercontent.com\".equalsIgnoreCase(host);",
  "  }",
  "",
  "  private void downloadAndOpen(PluginCall call, String downloadUrl, String expectedHash) {",
  "    HttpURLConnection connection = null;",
  "    File apk = new File(getContext().getCacheDir(), \"zuriel-official-update.apk\");",
  "    try {",
  "      connection = (HttpURLConnection) new URL(downloadUrl).openConnection();",
  "      connection.setInstanceFollowRedirects(true);",
  "      connection.setConnectTimeout(30000);",
  "      connection.setReadTimeout(60000);",
  "      connection.setRequestProperty(\"User-Agent\", \"Zuriel-Living-Word-Bible\");",
  "      int response = connection.getResponseCode();",
  "      if (response < 200 || response >= 300) throw new IllegalStateException(\"GitHub could not provide the update (HTTP \" + response + \" ).\");",
  "      if (!trustedHost(connection.getURL().getHost())) throw new IllegalStateException(\"The update redirected to an untrusted download host.\");",
  "      if (connection.getContentLengthLong() > 250L * 1024L * 1024L) throw new IllegalStateException(\"The update exceeds the 250 MB safety limit.\");",
  "      MessageDigest digest = MessageDigest.getInstance(\"SHA-256\");",
  "      long total = 0;",
  "      try (InputStream input = connection.getInputStream(); FileOutputStream output = new FileOutputStream(apk)) {",
  "        byte[] buffer = new byte[65536];",
  "        int count;",
  "        while ((count = input.read(buffer)) != -1) {",
  "          total += count;",
  "          if (total > 250L * 1024L * 1024L) throw new IllegalStateException(\"The update exceeds the 250 MB safety limit.\");",
  "          digest.update(buffer, 0, count);",
  "          output.write(buffer, 0, count);",
  "        }",
  "      }",
  "      StringBuilder actual = new StringBuilder();",
  "      for (byte value : digest.digest()) actual.append(String.format(\"%02x\", value));",
  "      if (!expectedHash.equals(actual.toString())) { apk.delete(); throw new IllegalStateException(\"The downloaded APK failed its SHA-256 check. Nothing was installed.\"); }",
  "      Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + \".fileprovider\", apk);",
  "      Intent install = new Intent(Intent.ACTION_VIEW);",
  "      install.setDataAndType(uri, \"application/vnd.android.package-archive\");",
  "      install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);",
  "      getActivity().runOnUiThread(() -> {",
  "        try {",
  "          getActivity().startActivity(install);",
  "          call.resolve(new JSObject().put(\"installerOpened\", true));",
  "        } catch (Exception error) { call.reject(\"Android could not open the installer. Your current app and saved data are unchanged.\", error); }",
  "      });",
  "    } catch (Exception error) {",
  "      apk.delete();",
  "      getActivity().runOnUiThread(() -> call.reject(error.getMessage() == null ? \"The official update could not be downloaded safely.\" : error.getMessage(), error));",
  "    } finally { if (connection != null) connection.disconnect(); }",
  "  }",
  "}"
].join("\n");
await writeFile(pluginPath, java);

let updatedActivity = activity;
if (!updatedActivity.includes("ZurielUpdaterPlugin")) {
  // Insert a real import after the package declaration. Use a callback so
  // JavaScript replacement-string escapes cannot become literal "\\n" text.
  const packageDeclaration = /^(package\\s+[A-Za-z0-9_.]+;?)$/m;
  if (!packageDeclaration.test(updatedActivity)) {
    throw new Error("Could not insert the updater import: package declaration was not found.");
  }
  updatedActivity = updatedActivity.replace(
    packageDeclaration,
    (line) => line + "\\n\\nimport " + packageName + ".ZurielUpdaterPlugin" + (activityPath.endsWith(".java") ? ";" : "")
  );
  if (activityPath.endsWith(".kt")) {
    const registration = "class MainActivity : BridgeActivity() {\n    override fun onCreate(savedInstanceState: android.os.Bundle?) {\n        registerPlugin(ZurielUpdaterPlugin::class.java)\n        super.onCreate(savedInstanceState)\n    }\n}";
    if (/class MainActivity\s*:\s*BridgeActivity\(\)\s*\{/.test(updatedActivity)) {
      updatedActivity = updatedActivity.replace(/class MainActivity\s*:\s*BridgeActivity\(\)\s*\{/, registration);
    } else if (/class MainActivity\s*:\s*BridgeActivity\(\)\s*$/.test(updatedActivity)) {
      updatedActivity = updatedActivity.replace(/class MainActivity\s*:\s*BridgeActivity\(\)\s*$/, registration);
    } else {
      throw new Error("Could not locate the standard Capacitor MainActivity Kotlin class.");
    }
  } else {
    updatedActivity = updatedActivity.replace(/public class MainActivity extends BridgeActivity \{/, "public class MainActivity extends BridgeActivity {\n    @Override\n    public void onCreate(android.os.Bundle savedInstanceState) {\n        registerPlugin(ZurielUpdaterPlugin.class);\n        super.onCreate(savedInstanceState);\n    }");
  }
  if (updatedActivity === activity) throw new Error("Could not register ZurielUpdaterPlugin in MainActivity.");
  await writeFile(activityPath, updatedActivity);
}

let manifest = await readFile(manifestPath, "utf8");
if (!manifest.includes("android.permission.REQUEST_INSTALL_PACKAGES")) {
  manifest = manifest.replace("<application", '<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />\n    <application');
}
if (!manifest.includes(".fileprovider")) {
  manifest = manifest.replace("</application>", [
    "        <provider",
    '            android:name="androidx.core.content.FileProvider"',
    '            android:authorities="${applicationId}.fileprovider"',
    '            android:exported="false"',
    '            android:grantUriPermissions="true">',
    "            <meta-data",
    '                android:name="android.support.FILE_PROVIDER_PATHS"',
    '                android:resource="@xml/zuriel_file_paths" />',
    "        </provider>",
    "    </application>"
  ].join("\n"));
}
if (!manifest.includes('android:name="androidx.core.content.FileProvider"') ||
    !manifest.includes('android:resource="@xml/zuriel_file_paths"') ||
    !manifest.includes("android.permission.REQUEST_INSTALL_PACKAGES")) {
  throw new Error("Android manifest could not be safely configured for the verified update installer.");
}
if (!manifest.includes("</application>")) {
  throw new Error("Android manifest has no closing application element for the update FileProvider.");
}
await writeFile(manifestPath, manifest);
const xmlPath = join(androidRoot, "app/src/main/res/xml/zuriel_file_paths.xml");
await mkdir(dirname(xmlPath), { recursive: true });
await writeFile(xmlPath, '<?xml version="1.0" encoding="utf-8"?>\n<paths xmlns:android="http://schemas.android.com/apk/res/android">\n    <cache-path name="zuriel_updates" path="." />\n</paths>\n');
console.log("Prepared the native checksum-verified Android update installer.");
