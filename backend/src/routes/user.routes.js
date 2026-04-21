const router = require('express').Router();
const { getProfile, toggleFavorite, getFavorites } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/profile', protect, getProfile);
router.get('/favorites', protect, getFavorites);
router.post('/favorites/toggle', protect, toggleFavorite);

module.exports = router;
