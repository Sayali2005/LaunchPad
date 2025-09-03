// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low','medium','high'], default: 'low' },
  dueDate: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
