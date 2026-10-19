# IBAWEAR Razorpay India Checkout

This repository contains the Razorpay serverless backend for the IBAWEAR India campaign page.

## Required landing-page file
Before deploying, add the prepared IBAWEAR Razorpay campaign HTML to the repository root and name it `index.html`. Keep the API handlers in the root-level `api/` directory.

## Backend files
- `api/create-order.js` — creates INR payment orders server-side.
- `api/verify-payment.js` — verifies the HMAC-SHA256 checkout signature.
- `package.json` — Razorpay Node SDK dependency.
- `.env.example` — environment variable template. Never commit a real `.env` file.

## Vercel environment variables
Configure these in Project Settings → Environment Variables:
- `RAZORPAY_KEY_ID` — public Razorpay test/live key ID.
- `RAZORPAY_KEY_SECRET` — secret key; keep server-side only.
- `RAZORPAY_AMOUNT_PAISE` — amount in paise. Default is `100` (₹1) for testing; set the actual INR price before launch.

Use Razorpay Test Mode first. Do not use live credentials until checkout and server-side signature verification have been tested. The amount is controlled server-side and must be changed to the intended Indian-customer price before production.

## Endpoints
- `POST /api/create-order` creates an INR order.
- `POST /api/verify-payment` validates `razorpay_order_id|razorpay_payment_id` using HMAC-SHA256 and the server-side secret.

Never expose `RAZORPAY_KEY_SECRET` in client-side HTML or commit it to GitHub.
