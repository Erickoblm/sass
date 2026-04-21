const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Utilisateur introuvable' });
    req.user = user;
    next();
  } catch (_error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès refusé' });
  next();
}

function requireActiveSubscription(req, res, next) {
  const active = ['active', 'trial'].includes(req.user.subscriptionStatus);
  if (!active) return res.status(402).json({ message: 'Abonnement requis' });
  next();
}

module.exports = { protect, adminOnly, requireActiveSubscription };
