const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../utils/jwt');

async function register(req, res) {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash,
    subscriptionStatus: 'trial',
    subscriptionEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  const token = signToken({ id: user._id, role: user.role });
  return res.status(201).json({ token, user });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) return res.status(401).json({ message: 'Identifiants invalides' });

  if (user.activeSessions >= user.maxSessions) {
    return res.status(429).json({ message: 'Trop de sessions actives. Déconnectez un appareil.' });
  }

  user.activeSessions += 1;
  await user.save();

  const token = signToken({ id: user._id, role: user.role });
  return res.json({ token, user });
}

async function me(req, res) {
  return res.json(req.user);
}

async function logout(req, res) {
  req.user.activeSessions = Math.max(0, req.user.activeSessions - 1);
  await req.user.save();
  return res.json({ message: 'Déconnecté' });
}

module.exports = { register, login, me, logout };
