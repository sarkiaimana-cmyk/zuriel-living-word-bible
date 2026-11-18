# Connecting YouVersion to Zuriel

This is a one-time deployment setup. The Bible reader keeps its bundled offline KJV if the online service is not configured or unavailable.

## What is required

1. A YouVersion Platform app key for the registered Zuriel app. The key must have publisher-approved access to the Bible versions you want to display. An API.Bible key is a different provider credential and cannot be used as the YouVersion app key.
2. A Cloudflare account with Workers available.
3. Access to the GitHub repository settings for `sarkiaimana-cmyk/zuriel-living-word-bible`.

Never paste either provider key into a chat, source file, issue, commit, or screenshot. The YouVersion key is stored only as a Cloudflare Worker secret.

## Cloudflare deployment token

Create an account-owned Cloudflare API token for the account that will host the Worker.

- If the Worker `zuriel-bible-translations` does not exist yet, the first deployment needs the Cloudflare **Workers Admin** role at the Workers product scope because it creates the Worker.
- If that Worker already exists, **Workers Editor** scoped to that Worker is sufficient for deploys and secret updates.
- The deployment workflow also needs to read the account's workers.dev subdomain; Cloudflare documents this endpoint under Workers Scripts Read/Write.
- Do not use the Global API Key.

Official references:
- https://developers.cloudflare.com/workers/authorization/
- https://developers.cloudflare.com/workers/authorization/workers/
- https://developers.cloudflare.com/api/resources/workers/subresources/subdomains/methods/get/

## Add the three GitHub Actions secrets

On the repository page:

1. Open **Settings**.
2. Open **Secrets and variables** → **Actions**.
3. Under **Repository secrets**, choose **New repository secret**.
4. Add these three names exactly, one at a time:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | The Cloudflare API token described above |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID for the same account |
| `ZITE_YVP_APP_KEY` | The YouVersion Platform app key for Zuriel |

Do not add the key to repository Variables. Do not commit it to any file. GitHub masks Actions secrets in logs, and the workflow checks that the key is never printed.

## Run the protected deployment

1. Open the repository's **Actions** tab.
2. Select **Deploy Zuriel Bible translations proxy (manual)**.
3. Choose **Run workflow**.
4. Tick the confirmation that the Cloudflare Workers plan and YouVersion publisher access have been checked.
5. Start the workflow and wait for its result.

The workflow tests the translation Worker, deploys it, stores the YouVersion app key as a Cloudflare secret, and makes a live request to the authorised English Bible catalogue. It must receive HTTP 200 and the expected GitHub Pages CORS header before it reports success.

## Important activation boundary

A successful Worker deployment does not by itself mean the Android app is connected. The workflow reports the exact `workers.dev` endpoint. The app's `window.ZURIEL_TRANSLATION_API_BASE` remains empty until that endpoint is configured in the app release. Do not assume a YouVersion version is available merely because it appears in a requested list: the app shows only versions actually returned for the registered key, and passage access remains subject to each publisher's licence.

The offline KJV is not replaced, and licensed online text is not cached for offline use.
