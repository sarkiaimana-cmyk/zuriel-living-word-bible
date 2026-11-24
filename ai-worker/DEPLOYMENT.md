# Zuriel AI pilot — deployment checklist

**Do not deploy until the account, free quota, Turnstile widget and repository secrets are ready.** This workflow is manual and has an extra confirmation checkbox. It does not deploy on ordinary commits.

## Cloudflare account and free-plan setup

1. Create or sign in to a Cloudflare account.
2. Confirm the Workers plan remains **Free**. Do not upgrade to Workers Paid for this project.
3. Confirm Workers AI is available and that `@cf/google/gemma-4-26b-a4b-it` is available within the 10,000-Neuron daily free allocation.
4. In Turnstile, create a **Managed** widget for the Zuriel AI assistant. Add `localhost` for the Android WebView and add only verified production hostnames if/when needed. Set the action to `zuriel_ai_question`.
5. Copy the **sitekey** (public) and the **secret key** (private). The sitekey can be placed in `wrangler.jsonc`; never commit the secret.

Turnstile requires the client widget and mandatory server-side Siteverify validation. Its tokens are single-use and expire after five minutes. In Android WebView, JavaScript and DOM storage must be enabled and `challenges.cloudflare.com`, frames, cookies and local storage must be accessible.

## Values to configure

Before deploying, set the following in `ai-worker/wrangler.jsonc`:
- `vars.TURNSTILE_SITE_KEY`: the public sitekey from the Managed widget.
- `vars.TURNSTILE_HOSTNAMES`: exact hostname(s) returned by Siteverify, e.g. `localhost` for the Android WebView.
- `vars.ALLOWED_ORIGINS`: exact origin(s), e.g. `https://localhost` for the Android WebView. Add a web origin only after confirming the actual published URL.

Do not put the Turnstile secret in `wrangler.jsonc`.

## GitHub Actions secrets

In the GitHub repository, open **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | Account ID from the Cloudflare dashboard |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token created with the official **Edit Cloudflare Workers** template, scoped only to the Zuriel account |
| `TURNSTILE_SECRET` | Private Turnstile secret key |

Never paste any of these secret values into ChatGPT, source code, a commit, an issue or a pull request. The deployment workflow reads them as GitHub Actions secrets and does not print their values.

## Manual deployment

Only after all checks above are complete:
1. Open the repository's **Actions** tab.
2. Select **Deploy Zuriel AI pilot (manual)**.
3. Select **Run workflow** and tick the confirmation checkbox.
4. The workflow installs Wrangler, runs the worker tests, verifies all 66 books / 1,189 chapters / 31,102 verses, uploads the Turnstile secret to Cloudflare, generates the chapter assets and deploys the Worker.
5. Record the Worker URL from the deployment output. Do not add it to the Android app until a separate integration change and live endpoint tests pass.

If a required secret or public widget setting is missing, the workflow stops before deployment. A successful deployment still does not prove Android WebView Turnstile works; test the challenge on the actual phone before enabling the assistant.


## YouVersion translation access (separate Worker)

The multi-translation reader uses a dedicated translation-only Cloudflare Worker. It is separate from the AI pilot so licensed Bible lookup does not require enabling AI, configuring Turnstile, or connecting an AI provider.

Before deployment:
1. Confirm the YouVersion Platform app key is valid and the app has the intended English Bible versions selected.
2. Confirm the exact publisher access and attribution requirements for each version. A provider 403 is a licensing denial, not an error to work around.
3. Confirm the Cloudflare account remains on the Workers Free plan. Do not upgrade to Workers Paid for Zuriel.
4. In GitHub repository Settings → Secrets and variables → Actions, add:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN` (must include the exact account named by `CLOUDFLARE_ACCOUNT_ID`; grant Workers Scripts Write at account scope, or the current Workers Admin/Editor roles at the appropriate product/Worker scope)
   - `ZITE_YVP_APP_KEY` (the YouVersion Platform app key)
   - `API_BIBLE_KEY` (the API.Bible server-side key; required so both providers are verified before activation)
5. The deployment workflow runs `wrangler whoami` so the account attached to the token can be checked before deployment. If Cloudflare reports “No access to the specified resource” for the Worker `/secrets` endpoint, the token account scope or Worker permission is wrong; replacing either Bible provider key will not fix that error. Creating a new Worker requires Workers Admin at the Workers product scope; deploying or managing secrets on an existing Worker requires Workers Editor for `zuriel-bible-translations`.
6. Never paste any of these values into ChatGPT, app settings, source files, commits, issues or pull requests.

Manual deployment:
1. Open the repository's Actions tab.
2. Select **Deploy Zuriel Bible translations proxy (manual)**.
3. Select Run workflow and tick the confirmation checkbox only after the account and publisher checks above are complete.
4. The workflow runs the translation proxy tests, uploads the app key as a Worker Secret, and deploys `wrangler.translations.jsonc`.
5. Record the resulting Worker URL. The workflow discovers the exact `workers.dev` URL, verifies live passages from both providers (including API.Bible FUMS v3), then writes the verified endpoint into `version.json` on the reviewed integration branch and dispatches the full application validation workflow. The endpoint is not written to protected `main` directly.

The translation-only Worker exposes only `/api/youversion/bibles` and its passage routes. It does not expose the AI assistant endpoint, does not require Turnstile, applies its own request rate limit, checks exact allowed origins, and returns `no-store` responses. The app requests a passage only after the reader explicitly chooses a version and taps Load. It displays publisher copyright/attribution and does not persist online Bible text or cache it for offline use. The bundled KJV remains the offline fallback.

Do not enable a version simply because it appears in a public catalogue. Only versions returned to the registered Zuriel app key may be offered, and each passage must retain the publisher's required attribution.
