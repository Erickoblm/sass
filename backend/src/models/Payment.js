const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    method: { type: String, enum: ['MVola', 'Orange Money', 'Airtel Money'], required: true },
    phoneNumber: { type: String, required: true },
    transactionRef: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'validated', 'rejected'], default: 'pending' },
    validatedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
