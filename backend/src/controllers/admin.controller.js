const Content = require('../models/Content');
const User = require('../models/User');
const Payment = require('../models/Payment');

async function createContent(req, res) {
  const content = await Content.create(req.body);
  res.status(201).json(content);
}

async function deleteContent(req, res) {
  await Content.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contenu supprimé' });
}

async function listUsers(req, res) {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json(users);
}

async function listPayments(req, res) {
  const payments = await Payment.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(payments);
}

async function dashboard(req, res) {
  const [usersCount, activeSubscriptions, revenuesAgg] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ subscriptionStatus: 'active' }),
    Payment.aggregate([{ $match: { status: 'validated' } }, { $group: { _id: null, total: { $sum: '$amount' } } }])
  ]);

  res.json({
    usersCount,
    activeSubscriptions,
    monthlyRevenueMGA: revenuesAgg[0]?.total || 0
  });
}

module.exports = { createContent, deleteContent, listUsers, listPayments, dashboard };
