const router = require('express').Router();
const { listContent, getContentById, getRecommendations, addWatchHistory } = require('../controllers/content.controller');
const { protect, requireActiveSubscription } = require('../middleware/auth.middleware');

router.get('/', listContent);
router.get('/recommendations', protect, getRecommendations);
router.get('/:id', protect, requireActiveSubscription, getContentById);
router.post('/watch-history', protect, requireActiveSubscription, addWatchHistory);

module.exports = router;
