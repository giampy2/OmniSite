const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Rotte
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paypalRoutes = require('./routes/paypalRoutes'); // PayPal

const app = express();

// Middleware globali
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotta base
app.get('/', (req, res) => {
  res.json({ message: 'OmniSite API attiva in locale' });
});

// Rotte API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/paypal', paypalRoutes); // PayPal

// Avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
console.log("Redeploy test");
