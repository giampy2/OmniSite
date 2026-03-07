const { createOrder, captureOrder } = require("../services/paypalService");

async function create(req, res, next) {
  try {
    const order = await createOrder();
    res.json(order);
  } catch (err) {
    next(err);
  }
}

async function capture(req, res, next) {
  try {
    const { orderId } = req.params;
    const result = await captureOrder(orderId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  capture
};
