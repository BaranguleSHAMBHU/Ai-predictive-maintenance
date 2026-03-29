const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  manufactureDate: { type: Date, required: true },
  startUseDate: { type: Date, required: true },
  expectedLifespanDays: { type: Number, default: 365 }, // Baseline for AI to adjust
  predictedMaintenanceDate: { type: Date },
  status: { type: String, enum: ['Green', 'Yellow', 'Red'], default: 'Green' }
}, { timestamps: true });

module.exports = mongoose.model('Component', ComponentSchema);