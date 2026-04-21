const Content = require('../models/Content');
const { recommendFromHistory } = require('../services/recommendation.service');

async function listContent(req, res) {
  const { q, category, type } = req.query;
  const filter = {};

  if (q) filter.title = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  if (type) filter.type = type;

  const items = await Content.find(filter).sort({ createdAt: -1 });
  res.json(items);
}

async function getContentById(req, res) {
  const item = await Content.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Contenu introuvable' });
  return res.json(item);
}

async function getRecommendations(req, res) {
  const allContent = await Content.find().limit(100);
  await req.user.populate('watchHistory.content');
  const recommendations = recommendFromHistory(allContent, req.user);
  return res.json(recommendations);
}

async function addWatchHistory(req, res) {
  const { contentId, progressSeconds } = req.body;
  req.user.watchHistory.unshift({ content: contentId, progressSeconds, watchedAt: new Date() });
  req.user.watchHistory = req.user.watchHistory.slice(0, 100);
  await req.user.save();
  res.json({ message: 'Historique mis à jour' });
}

module.exports = { listContent, getContentById, getRecommendations, addWatchHistory };
