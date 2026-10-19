# IBAWEAR Razorpay India Checkout

IBAWEAR campaign landing page and Razorpay Standard Checkout backend for INR payments.

## Files
- `index.html` — the campaign landing page with the Razorpay checkout button.
- `api/create-order.js` — creates Razorpay orders server-side.
- `api/verify-payment.js` — verifies the HMAC-SHA256 checkout signature.
- `package.json` — Razorpay Node SDK dependency.
- `.env.example` — environment variable template. Never commit a real `.env` file.

## Vercel environment variables
Configure these in Project Settings → Environment Variables:
- `RAZORPAY_KEY_ID` — public Razorpay test/live key ID.
- `RAZORPAY_KEY_SECRET` — secret key; keep server-side only.
- `RAZORPAY_AMOUNT_PAISE` — amount in paise. Default is `100` (₹1) for testing; set the actual INR price before launch.

Use Razorpay Test Mode first. Do not use live credentials until the checkout and server-side signature verification have been tested. The amount is controlled server-side and must be changed to the intended customer price before production.

## Deployment
This repository is structured for Vercel Node.js serverless functions. Keep the campaign HTML at the repository root and the API handlers under `/api`. Vercel installs dependencies from `package.json`.

## Endpoints
- `POST /api/create-order` creates an INR order.
- `POST /api/verify-payment` validates `razorpay_order_id|razorpay_payment_id` using HMAC-SHA256 and the server-side secret.

Never expose `RAZORPAY_KEY_SECRET` in client-side HTML or commit it to GitHub.
