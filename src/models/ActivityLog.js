const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  action: String,

  entityType: {
    type: String,
    enum: ['task', 'project']
  },

  entityId: mongoose.Schema.Types.ObjectId,

  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activitySchema);