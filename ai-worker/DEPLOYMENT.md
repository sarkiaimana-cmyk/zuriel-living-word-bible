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
| `ZITE_YVP_APP_KEY` | Optional YouVersion Platform app key for the protected Bible translation proxy |

Never paste any of these secret values into ChatGPT, source code, a commit, an issue or a pull request. The deployment workflow reads them as GitHub Actions secrets and does not print their values.

## Manual deployment

Only after all checks above are complete:
1. Open the repository's **Actions** tab.
2. Select **Deploy Zuriel AI pilot (manual)**.
3. Select **Run workflow** and tick the confirmation checkbox.
4. The workflow installs Wrangler, runs the worker tests, verifies all 66 books / 1,189 chapters / 31,102 verses, uploads the Turnstile secret to Cloudflare, generates the chapter assets and deploys the Worker.
5. Record the Worker URL from the deployment output. Do not add it to the Android app until a separate integration change and live endpoint tests pass.

If a required secret or public widget setting is missing, the workflow stops before deployment. A successful deployment still does not prove Android WebView Turnstile works; test the challenge on the actual phone before enabling the assistant.


## YouVersion translation access (optional)

When ready to enable the multi-translation reader, add the existing YouVersion app key as the GitHub Actions repository secret `ZITE_YVP_APP_KEY`. Do not paste it into ChatGPT, source files, app settings or commits. The manual deployment workflow uploads it as a Cloudflare Worker secret when present.

The proxy requests only the English versions licensed to the registered app key (`language_ranges[]=en`); it never requests the `all_available=true` catalogue. Check that the exact versions selected for Zuriel appear in `GET /api/youversion/bibles`. A version that returns 403 is not licensed for this app key and must remain unavailable until the publisher agreement is accepted.

The app must display the copyright and publisher attribution returned with each passage. Do not cache licensed text for offline use unless the applicable publisher licence expressly allows it. The local KJV remains the offline fallback.
