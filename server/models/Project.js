const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    subtitle: { type: String, trim: true, maxlength: 160 },
    category: { type: String, enum: ['fullstack', 'ai', 'mobile', 'data'], default: 'fullstack' },
    summary: { type: String, required: true, trim: true, maxlength: 600 },
    highlights: [{ type: String, trim: true, maxlength: 300 }],
    stack: [{ type: String, trim: true }],
    repoUrl: { type: String, trim: true, default: '' },
    liveUrl: { type: String, trim: true, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
