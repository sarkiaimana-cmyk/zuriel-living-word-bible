# Connecting online Bible translation providers to Zuriel

This is a one-time deployment setup. The Bible reader keeps its bundled offline KJV if the online service is not configured or unavailable.

## What is required

1. A YouVersion Platform app key for the registered Zuriel app. The key must have publisher-approved access to the Bible versions you want to display. An API.Bible key is a different provider credential and cannot be used as the YouVersion app key.
2. A Cloudflare account with Workers available.
3. Access to the GitHub repository settings for `sarkiaimana-cmyk/zuriel-living-word-bible`.
4. (Optional) An API.Bible key with access to the English versions you want to use.

Never paste either provider key into a chat, source file, issue, commit, or screenshot. Both keys are stored only as Cloudflare Worker secrets.

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

## Add the three required and one optional GitHub Actions secret

On the repository page:

1. Open **Settings**.
2. Open **Secrets and variables** → **Actions**.
3. Under **Repository secrets**, choose **New repository secret**.
4. Add the three required names and, if needed, the optional fourth name:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | The Cloudflare API token described above |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID for the same account |
| `ZITE_YVP_APP_KEY` | The YouVersion Platform app key for Zuriel |
| `API_BIBLE_KEY` (optional) | Your API.Bible key, if you want the second provider enabled |

Do not add either key to repository Variables. Do not commit them to any file. GitHub masks Actions secrets in logs, and the workflow does not print the keys. If `API_BIBLE_KEY` is omitted, YouVersion can still operate; the API.Bible option will report that it is not configured.

## Run the protected deployment

1. Open the repository's **Actions** tab.
2. Select **Deploy Zuriel Bible translations proxy (manual)**.
3. Choose **Run workflow**.
4. Tick the confirmation that the Cloudflare Workers plan and YouVersion publisher access have been checked.
5. Start the workflow and wait for its result.

The workflow tests the translation Worker, deploys it, stores the YouVersion app key as a Cloudflare secret, and makes a live request to the authorised YouVersion English Bible catalogue. If the optional API.Bible secret is present, it also installs that key as a Worker secret and smoke-tests the API.Bible English catalogue. Each configured provider must return HTTP 200 and the expected GitHub Pages CORS header before deployment reports success.

## Automatic app connection after a successful deployment

A successful live smoke test now saves the verified public `workers.dev` endpoint into the `translationApiBase` field in the repository's public `version.json`. The deployment workflow verifies that saved value before it reports success. The YouVersion app key is never written to this file.

Install Zuriel **1.4.61 or newer** before running the deployment if you want the app to discover the endpoint automatically. The comparison panel reads the public endpoint configuration when opened; no API key or manual source-code edit is needed. If the workflow cannot commit or verify the endpoint, it reports failure and the app safely remains on the offline KJV.

Do not assume a YouVersion version is available merely because it appears in a requested list: the app shows only versions actually returned for the registered key, and passage access remains subject to each publisher's licence.

## Optional API.Bible provider

If you add the repository secret `API_BIBLE_KEY`, the same protected translation Worker also exposes API.Bible's English catalogue and chapter endpoints. The app's provider selector then lets the reader choose YouVersion Platform or API.Bible. Each provider lists only the English Bible versions returned for its own server-side key; a requested translation is not assumed to be licensed.

API.Bible uses the `api-key` request header and returns structured Bible metadata and chapter text with publisher copyright information. Zuriel sends that key only from the Worker, requires publisher attribution before displaying a chapter, applies the shared translation rate limiter, and does not save online text for offline reading. API.Bible plan limits and Bible access depend on the account's current agreement; check the account dashboard before relying on a particular version.

Official API.Bible references:
- Authentication: https://docs.api.bible/quick-start/authentication/
- Available Bible catalogue and licensing: https://docs.api.bible/guides/bibles/
- Chapter retrieval and attribution fields: https://docs.api.bible/guides/chapters/
- Current plans and licensing: https://api.bible/

The deployment workflow installs `API_BIBLE_KEY` only when that optional GitHub secret exists. You do not need to create another Cloudflare Worker or replace the YouVersion key.

The offline KJV is not replaced, and licensed online text is not cached for offline use.
