// backend/models/JobOffer.js - Modèle complet pour les offres
const mongoose = require('mongoose');

const jobOfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'URL doit être valide'
    }
  },
  source: {
    type: String,
    required: true,
    enum: ['indeed', 'linkedin', 'company_website', 'welcometothejungle', 'other']
  },
  skills: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    trim: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'EUR'
    }
  },
  contractType: {
    type: String,
    enum: ['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance', 'Other']
  }
}, {
  timestamps: true
});

// Index pour éviter les doublons et optimiser les recherches
jobOfferSchema.index({ url: 1, experienceId: 1 }, { unique: true });
jobOfferSchema.index({ company: 'text', title: 'text', description: 'text' });
jobOfferSchema.index({ source: 1 });
jobOfferSchema.index({ skills: 1 });
jobOfferSchema.index({ location: 1 });
jobOfferSchema.index({ createdAt: -1 });

// Middleware pour nettoyer les offres expirées
jobOfferSchema.statics.cleanupExpired = async function() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return this.deleteMany({
    createdAt: { $lt: thirtyDaysAgo },
    isActive: true
  });
};

module.exports = mongoose.model('JobOffer', jobOfferSchema);