# Cloudflare Worker: Contact Form API Secure Backend

This Cloudflare Worker acts as a secure proxy between your React portfolio contact form, Cloudflare Turnstile, and EmailJS. It prevents bots from spamming your form by verifying Turnstile challenge tokens server-side, and keeps your EmailJS private keys/secrets safe from exposure in client-side code.

---

## 🛠️ Step-by-Step Configuration & Deployment

### 1. Install Dependencies
Make sure you have Node.js installed. In this directory (`cloudflare-worker`), Wrangler (the Cloudflare Developer Platform CLI) is ready to deploy your code. You do not need to install anything globally, you can run wrangler using `npx`.

### 2. Login to Cloudflare CLI
Authenticate Wrangler with your Cloudflare account by running the following command:
```bash
npx wrangler login
```
This will open a browser window and request access to your Cloudflare account.

### 3. Add Environment Secrets (Variables)
You must set up five secure environment secrets. These are encrypted by Cloudflare and injected directly into the worker at runtime.

You can configure these using the **Cloudflare Dashboard** (recommended) or the **Wrangler CLI**.

#### Option A: Via the Cloudflare Dashboard (Recommended)
1. Deploy the worker once first (see step 4 below).
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Workers & Pages** in the left sidebar and click on **`lumina-studios-contact-worker`**.
4. Select the **Settings** tab.
5. Go to **Variables** (sometimes named **Variables & Secrets**).
6. Click **Add secret** under the **Worker Secrets** section.
7. Add the following key-value pairs (clicking **Save and deploy** after adding):
   - `TURNSTILE_SECRET_KEY`: Your Cloudflare Turnstile Secret Key (obtained from your Turnstile dashboard).
   - `EMAILJS_SERVICE_ID`: Your EmailJS Service ID (e.g. `service_xxxxxx`).
   - `EMAILJS_TEMPLATE_ID`: Your EmailJS Template ID (e.g. `template_xxxxxx`).
   - `EMAILJS_PUBLIC_KEY`: Your EmailJS Public Key (e.g. `user_xxxxxx` or public API key).
   - `EMAILJS_PRIVATE_KEY`: Your EmailJS Private Key (also called access token, keep this secure!).

#### Option B: Via the Wrangler CLI
Run the following commands in your terminal (under the `cloudflare-worker` directory) and paste the corresponding values when prompted:
```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put EMAILJS_SERVICE_ID
npx wrangler secret put EMAILJS_TEMPLATE_ID
npx wrangler secret put EMAILJS_PUBLIC_KEY
npx wrangler secret put EMAILJS_PRIVATE_KEY
```

---

### 4. Deploy the Worker
Deploy the worker to your Cloudflare account using:
```bash
npx wrangler deploy
```
Once deployed, the terminal will print the worker's public URL, which will look like:
`https://lumina-studios-contact-worker.<your-subdomain>.workers.dev`

---

### 5. Update React Frontend `.env` File
1. Copy the deployed worker URL.
2. Open your React frontend's [`.env`](../.env) file.
3. Update the `VITE_CONTACT_WORKER_URL` variable with your actual deployed worker URL:
   ```env
   VITE_CONTACT_WORKER_URL=https://lumina-studios-contact-worker.<your-subdomain>.workers.dev
   ```

---

## 💻 Local Development & Testing

To run the worker locally for testing:
1. Create a file named `.dev.vars` inside this `cloudflare-worker` directory (Wrangler ignores this file during deployment, but reads it locally).
2. Add your secrets in `.dev.vars` format:
   ```env
   TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
   EMAILJS_SERVICE_ID=service_xxx
   EMAILJS_TEMPLATE_ID=template_xxx
   EMAILJS_PUBLIC_KEY=xxx
   EMAILJS_PRIVATE_KEY=xxx
   ```
   *(Note: `1x0000000000000000000000000000000AA` is the Turnstile testing secret key which always passes validation).*
3. Run the local development server:
   ```bash
   npx wrangler dev
   ```
   This will spin up a local instance on `http://localhost:8787`. You can set `VITE_CONTACT_WORKER_URL=http://localhost:8787` in your frontend's `.env` for local testing.

---

## 🔒 Production Security Best Practice (CORS Restrict)
By default, the worker allows any website to make requests to it (`Access-Control-Allow-Origin: *`).
To prevent other domains from utilizing your API, open `index.js` and change `corsHeaders`'s `"Access-Control-Allow-Origin"` property to your production domain:
```javascript
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://luminastudios.com", // Replace with your production domain
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};
```
