const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require("mongoose");

// Stripe
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

// Express
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connesso"))
  .catch(err => console.error("Errore MongoDB:", err));

// Rotta base
app.get('/', (req, res) => {
  res.json({ message: 'OmniSite API attiva' });
});

// Auth + Users
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Stripe Checkout
app.post("/api/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: "OmniSite Pro" },
            unit_amount: 9900,
          },
          quantity: 1,
        },
      ],
      success_url: "https://tuodominio.com/success",
      cancel_url: "https://tuodominio.com/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Errore Stripe:", err);
    res.status(500).json({ error: "Errore Stripe" });
  }
});

// Avvio server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`));
