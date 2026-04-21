const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    subscriptionStatus: { type: String, enum: ['inactive', 'trial', 'active', 'expired'], default: 'inactive' },
    subscriptionEndsAt: { type: Date },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    watchHistory: [
      {
        content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
        watchedAt: { type: Date, default: Date.now },
        progressSeconds: { type: Number, default: 0 }
      }
    ],
    activeSessions: { type: Number, default: 0 },
    maxSessions: { type: Number, default: 2 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
