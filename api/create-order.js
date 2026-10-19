module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const rawAmount = process.env.RAZORPAY_AMOUNT_PAISE || '100';
  const amount = Number(rawAmount);
  if (!keyId || !keySecret) return res.status(500).json({ error: 'Razorpay is not configured.' });
  if (!Number.isSafeInteger(amount) || amount < 100) return res.status(500).json({ error: 'Configured amount is invalid.' });
  try {
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: `ibawear_${Date.now()}` });
    return res.status(200).json({ order_id: order.id, amount: order.amount, currency: order.currency, key_id: keyId });
  } catch (error) {
    console.error('Razorpay order creation failed:', error.message);
    return res.status(500).json({ error: 'Unable to create the payment order.' });
  }
};
