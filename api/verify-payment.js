const crypto = require("crypto");

function json(res, status, body) {
  return res.status(status).json(body);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed" });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body || {};
  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return json(res, 400, { error: "Missing payment verification fields." });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return json(res, 500, { error: "Razorpay server secret is not configured." });

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const expected = Buffer.from(expectedSignature, "utf8");
  const received = Buffer.from(String(razorpay_signature), "utf8");
  const valid = expected.length === received.length && crypto.timingSafeEqual(expected, received);

  if (!valid) return json(res, 400, { verified: false, error: "Signature mismatch." });
  return json(res, 200, { verified: true });
};
