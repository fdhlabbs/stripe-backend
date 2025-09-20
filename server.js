const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51S9AJLRrMeLQBy4krdZxCQASE9TgooY8lJiuJxoEAVoJ0pWQqXKiGxqwr5l1Yt7wKJn5lmWq6cF03l6tqhw5CVyg00bm4Ajmf9');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, email, description } = req.body;

    // Log inputs for debugging
    console.log("Received payment request:", { amount, email, description });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'myr',
      receipt_email: email,
      description: description || 'Car Service',
      metadata: {
        userEmail: email,
        desc: description
      },
      automatic_payment_methods: { enabled: true }
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Stripe backend running on port ${PORT}`));


