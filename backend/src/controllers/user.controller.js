async function getProfile(req, res) {
  res.json(req.user);
}

async function toggleFavorite(req, res) {
  const { contentId } = req.body;
  const exists = req.user.favorites.some((id) => id.toString() === contentId);

  if (exists) {
    req.user.favorites = req.user.favorites.filter((id) => id.toString() !== contentId);
  } else {
    req.user.favorites.push(contentId);
  }

  await req.user.save();
  await req.user.populate('favorites');
  res.json(req.user.favorites);
}

async function getFavorites(req, res) {
  await req.user.populate('favorites');
  res.json(req.user.favorites);
}

module.exports = { getProfile, toggleFavorite, getFavorites };
