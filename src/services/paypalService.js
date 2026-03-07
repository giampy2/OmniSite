const axios = require("axios");

const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_BASE = "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const response = await axios.post(
    `${PAYPAL_BASE}/v1/oauth2/token`,
    params,
    {
      auth: {
        username: PAYPAL_CLIENT,
        password: PAYPAL_SECRET
      }
    }
  );

  return response.data.access_token;
}

async function createOrder() {
  const accessToken = await getAccessToken();
console.log("PAYPAL_CLIENT:", PAYPAL_CLIENT);
console.log("PAYPAL_SECRET:", PAYPAL_SECRET ? "PRESENTE" : "MANCANTE");

  const response = await axios.post(
    `${PAYPAL_BASE}/v2/checkout/orders`,
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: "5.00"
          }
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

async function captureOrder(orderId) {
  const accessToken = await getAccessToken();

  const response = await axios.post(
    `${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

module.exports = {
  createOrder,
  captureOrder
};
