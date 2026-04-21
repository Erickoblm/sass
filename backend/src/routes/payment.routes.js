const router = require('express').Router();
const { createPayment, getMyPayments, validatePayment } = require('../controllers/payment.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

router.post('/', protect, createPayment);
router.get('/mine', protect, getMyPayments);
router.patch('/:id/validate', protect, adminOnly, validatePayment);

module.exports = router;
