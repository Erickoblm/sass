const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['film', 'series'], required: true },
    category: {
      type: String,
      enum: ['Film Malagasy', 'Série Malagasy', 'Comédie', 'Drame', 'Action'],
      required: true
    },
    posterUrl: { type: String, required: true },
    streamUrl: { type: String, required: true },
    streamType: { type: String, enum: ['mp4', 'hls'], default: 'mp4' },
    durationMinutes: { type: Number, default: 90 },
    year: { type: Number },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
