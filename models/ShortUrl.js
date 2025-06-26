const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  short_code: {
    type: String,
    required: true,
    unique: true
  },
  original_url: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  expires_at: {
    type: Date,
    required: false
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  },
  custom_alias: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
