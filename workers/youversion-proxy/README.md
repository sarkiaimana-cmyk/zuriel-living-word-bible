# Zuriel YouVersion secure connection

This Worker keeps the YouVersion App Key on the server. Never place the key in
`index.html`, `zuriel-config.js`, any browser JavaScript, or a public GitHub file.

## Deploy from the Cloudflare dashboard

1. Sign in to Cloudflare and open **Workers & Pages**.
2. Create a Worker named **zuriel-youversion-proxy** and deploy the starter Worker.
3. Open **Edit code**. Replace the starter code with the complete contents of
   `workers/youversion-proxy/src/index.mjs` in this repository, then deploy.
4. Open the Worker **Settings → Variables and Secrets**.
5. Add a **Secret** named `YVP_APP_KEY`. Paste the App Key from the Zuriel app
   in the YouVersion Platform portal. Do not paste the key into GitHub or this chat.
6. The default allowed origins cover the GitHub Pages project and Capacitor's
   local Android origins. If the website uses a different domain, add a text
   variable named `ALLOWED_ORIGINS` containing comma-separated exact origins,
   for example:
   `https://your-domain.example,https://sarkiaimana-cmyk.github.io,https://localhost,capacitor://localhost,http://localhost`
7. Open the Worker URL followed by `/health`. It should return JSON with
   `"ok":true` and `"appKeyConfigured":true`. This confirms configuration only;
   it does not yet prove that the selected Bible licenses or passage requests work.
8. Copy the Worker base URL (without `/health`). In `zuriel-config.js`, set
   `window.ZURIEL_TRANSLATION_API_BASE` to that URL, for example:
   `window.ZURIEL_TRANSLATION_API_BASE = "https://zuriel-youversion-proxy.YOUR-SUBDOMAIN.workers.dev";`
9. Publish the updated website and rebuild/sync the Android app. Keep the offline
   KJV as the fallback.

## Routes provided

- `GET /health` — reports whether the server secret is configured.
- `GET /api/youversion/bibles` — retrieves the English Bible catalog available
  to the app key, following pagination.
- `GET /api/youversion/bibles/{versionId}/passages/{USFM-reference}?format=text`
  — retrieves passage text and the version's copyright metadata.

The proxy uses YouVersion's official `X-YVP-App-Key` header server-side. The
browser receives only Bible data and attribution metadata. The proxy rejects
unknown browser origins, non-GET requests, invalid version IDs and malformed
USFM passage references. Responses are not cached by this Worker.

## Verification still required

After deployment, test the actual app key and each version the portal authorises.
A successful health response alone is not proof that a Bible version is licensed
or that passage text can be retrieved. Confirm the version list, load a known
passage such as John 3:16, verify its publisher attribution, and test failures
without disrupting the offline KJV.
