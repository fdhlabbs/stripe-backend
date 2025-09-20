const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51S9AJLRrMeLQBy4krdZxCQASE9TgooY8lJiuJxoEAVoJ0pWQqXKiGxqwr5l1Yt7wKJn5lmWq6cF03l6tqhw5CVyg00bm4Ajmf9');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in sen (smallest unit of MYR)
      currency: 'myr', // ✅ Correct for Malaysia
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Stripe backend running on port ${PORT}`));
