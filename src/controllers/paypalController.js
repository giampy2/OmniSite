const paypal = require('@paypal/checkout-server-sdk');

// Configurazione PayPal
function paypalClient() {
  const environment =
    process.env.PAYPAL_MODE === 'live'
      ? new paypal.core.LiveEnvironment(
          process.env.PAYPAL_CLIENT_ID,
          process.env.PAYPAL_SECRET
        )
      : new paypal.core.SandboxEnvironment(
          process.env.PAYPAL_CLIENT_ID,
          process.env.PAYPAL_SECRET
        );

  return new paypal.core.PayPalHttpClient(environment);
}

// CREATE ORDER
exports.createOrder = async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');

  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: '10.00'
        }
      }
    ]
  });

  try {
    const order = await paypalClient().execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella creazione ordine PayPal' });
  }
};

// CAPTURE ORDER
exports.captureOrder = async (req, res) => {
  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient().execute(request);
    res.json({ status: capture.result.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella cattura ordine PayPal' });
  }
};
