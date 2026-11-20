import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";

const root = await mkdtemp(join(tmpdir(), "zuriel-updater-test-"));
try {
  const javaDir = join(root, "android/app/src/main/java/com/zuriel/livingwordbible/release");
  const resDir = join(root, "android/app/src/main/res");
  await mkdir(javaDir, { recursive: true });
  await mkdir(resDir, { recursive: true });
  await mkdir(join(resDir, "xml"), { recursive: true });
  await writeFile(join(javaDir, "MainActivity.kt"),
    "package com.zuriel.livingwordbible.release\n\nimport com.getcapacitor.BridgeActivity\n\nclass MainActivity : BridgeActivity() {\n}\n");
  // Capacitor plugins may already declare a generic FileProvider. The updater
  // must add a distinct authority instead of treating that provider as its own.
  await writeFile(join(root, "android/app/src/main/AndroidManifest.xml"),
    '<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"><application android:label="Zuriel"><provider android:name="androidx.core.content.FileProvider" android:authorities="${applicationId}.fileprovider" android:exported="false"><meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/file_paths" /></provider></application></manifest>');
  const generator = resolve(process.cwd(), "scripts/prepare-android-updater.mjs");
  const run = spawnSync(process.execPath, [generator], { cwd: root, encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr || run.stdout);
  const activity = await readFile(join(javaDir, "MainActivity.kt"), "utf8");
  assert.match(activity, /import com\.zuriel\.livingwordbible\.release\.ZurielUpdaterPlugin/);
  assert.match(activity, /registerPlugin\(ZurielUpdaterPlugin::class\.java\)/);
  assert.doesNotMatch(activity, /\\\\n/);
  const plugin = await readFile(join(javaDir, "ZurielUpdaterPlugin.java"), "utf8");
  assert.match(plugin, /@CapacitorPlugin\(name = "ZurielUpdater"\)/);
  assert.match(plugin, /getPackageName\(\) \+ "\\.zuriel\\.updater\\.fileprovider"/);
  const manifest = await readFile(join(root, "android/app/src/main/AndroidManifest.xml"), "utf8");
  assert.match(manifest, /REQUEST_INSTALL_PACKAGES/);
  assert.match(manifest, /androidx\.core\.content\.FileProvider/);
  assert.match(manifest, /android:authorities="\$\{applicationId\}\.zuriel\.updater\.fileprovider"/);
  assert.match(manifest, /android:authorities="\$\{applicationId\}\.fileprovider"/, "The existing Capacitor provider must remain intact.");
  assert.equal((manifest.match(/androidx\.core\.content\.FileProvider/g) || []).length, 2, "The updater must receive its own provider alongside the existing provider.");
  assert.match(manifest, /@xml\/zuriel_file_paths/);
  const paths = await readFile(join(resDir, "xml/zuriel_file_paths.xml"), "utf8");
  assert.match(paths, /cache-path/);
  console.log("Native updater generator test passed: Kotlin import, plugin registration, permission, FileProvider and cache paths.");
} finally {
  await rm(root, { recursive: true, force: true });
}
