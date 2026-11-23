# Zuriel YouVersion translation proxy deployment

## Current state

The translation reader is implemented, but online translations are **not live yet**. The app's `window.ZURIEL_TRANSLATION_API_BASE` remains blank, so the complete offline KJV continues to work without an internet connection.

The deployment workflow is manual and fail-closed. It does not deploy until the confirmation input is checked.

## Required GitHub repository secrets

Open the GitHub repository:

1. Go to **Settings**.
2. Open **Secrets and variables → Actions**.
3. Under **Repository secrets**, add the three required secrets and, if API.Bible should also be enabled, its optional key:

| Secret name | What belongs there |
|---|---|
| `CLOUDFLARE_API_TOKEN` | An account-owned token for the same account as the account ID. For first creation, grant Workers Admin at the Workers product scope; after the Worker exists, Workers Editor scoped to `zuriel-bible-translations` is sufficient. |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID |
| `ZITE_YVP_APP_KEY` | The YouVersion Platform app key |
| `API_BIBLE_KEY` (optional) | The API.Bible API key for the translations you are licensed to access. Store it only as a GitHub Actions secret; the Worker installs it as a Cloudflare secret. |

Never paste these values into a chat, issue, source file or commit. Do not put either provider key in `index.html` or the mobile app. `API_BIBLE_KEY` is optional: without it, YouVersion can still be verified and used, but API.Bible remains unavailable.

The Cloudflare token must belong to the same account as the account ID. Cloudflare requires Workers Admin at product scope to create a new Worker; after creation, Workers Editor scoped to this Worker is sufficient for deployments and secret updates. The workflow checks the account with `wrangler whoami` and reports permission errors without printing any key.

## Run the deployment

1. Open the repository's **Actions** tab.
2. Select **Deploy Zuriel Bible translations proxy (manual)**.
3. Choose **Run workflow**.
4. Confirm that the Cloudflare Workers Free plan and YouVersion publisher access/licensing have been checked.
5. Run the workflow.

The workflow installs the YouVersion key as a Cloudflare Worker secret, deploys the protected Worker, discovers the account's `workers.dev` subdomain, and verifies that the Worker route is enabled. It then checks the authorised English Bible catalogue and makes a second live request for **John 3:16** using an actually authorised YouVersion Bible ID. The chapter response must contain non-empty passage text, verified publisher copyright or promotional attribution (retrieved from the Bible-version metadata endpoint when it is not included with the passage), and the expected GitHub Pages CORS origin. A catalogue-only success is not enough to connect the provider. If an API.Bible key is also configured, the workflow independently requests **John 3** and requires chapter text, reference, publisher attribution and CORS before reporting that provider as verified.

A successful run prints:
- the exact Worker URL to configure in the app;
- the number of English Bible versions the YouVersion app key is authorised to access;
- confirmation that a real John 3:16 passage was retrieved and returned usable text;
- if configured, confirmation that API.Bible returned a real John 3 chapter with publisher attribution.

If Cloudflare has no `workers.dev` subdomain, enable one in **Workers & Pages** and rerun the workflow. The workflow must pass the live request and CORS checks before the endpoint is connected to the app.

## Final app connection

After a successful deployment, the Worker URL is safe to share; it is not the API key. The app configuration will then be set to:


```js
window.ZURIEL_TRANSLATION_API_BASE = "https://zuriel-bible-translations.YOUR-SUBDOMAIN.workers.dev";
```

The actual URL must come from the successful deployment output. Do not replace `YOUR-SUBDOMAIN` with a guess.

A new app release is required after the endpoint is configured. The offline KJV remains the default and is never replaced by an online response. Online translation text is requested only when the reader asks for it, and publisher attribution is required. A translation the reader explicitly downloads is stored in the device's IndexedDB for offline reading; the downloaded translation remains listed for offline selection after restart. To follow API.Bible's guidance to cache fewer than 500 consecutive verses, Zuriel retains only the most recently viewed chapter per API.Bible translation. Cached chapters are refreshed within 14 days or less. The web app requests FUMS v3 tokens and reports each online chapter view through the official FUMS tracker. Download only versions and copies covered by the user's existing publisher-approved access.
