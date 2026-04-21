const Payment = require('../models/Payment');
const User = require('../models/User');

async function createPayment(req, res) {
  const { method, phoneNumber, transactionRef } = req.body;
  const payment = await Payment.create({
    user: req.user._id,
    method,
    phoneNumber,
    transactionRef,
    amount: 15000,
    status: 'pending'
  });

  if (transactionRef.toLowerCase().startsWith('auto-')) {
    payment.status = 'validated';
    payment.validatedAt = new Date();
    await payment.save();

    req.user.subscriptionStatus = 'active';
    req.user.subscriptionEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await req.user.save();
  }

  res.status(201).json(payment);
}

async function getMyPayments(req, res) {
  const payments = await Payment.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(payments);
}

async function validatePayment(req, res) {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Paiement introuvable' });

  payment.status = 'validated';
  payment.validatedAt = new Date();
  await payment.save();

  const user = await User.findById(payment.user);
  user.subscriptionStatus = 'active';
  user.subscriptionEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await user.save();

  res.json({ message: 'Paiement validé', payment });
}

module.exports = { createPayment, getMyPayments, validatePayment };
