const router = require('express').Router();
const { createContent, deleteContent, listUsers, listPayments, dashboard } = require('../controllers/admin.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

router.use(protect, adminOnly);
router.post('/content', createContent);
router.delete('/content/:id', deleteContent);
router.get('/users', listUsers);
router.get('/payments', listPayments);
router.get('/dashboard', dashboard);

module.exports = router;
