// backend/models/Experience.js
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  missions: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  domain: {
    type: String,
    trim: true,
    enum: [
    'Développement logiciel',
    'Développement web',
    'Systèmes d\'information',
    'Business Intelligence',
    'Data',
    'Cybersécurité',
    'Conseil',
    'Management de projet',
    'Transformation numérique',
    'Innovation',
    '' // Permettre vide

    ]
  },
  duration: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        // Email optionnel, mais s'il est fourni, il doit être valide
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Email de contact invalide'
    }
  },
  isContactVisible: {
    type: Boolean,
    default: false
  },
  extractedKeywords: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index pour la recherche full-text
experienceSchema.index({
  company: 'text',
  position: 'text',
  description: 'text',
  missions: 'text'
});

// Index pour les filtres fréquents
experienceSchema.index({ userId: 1 });
experienceSchema.index({ domain: 1 });
experienceSchema.index({ year: 1 });
experienceSchema.index({ company: 1 });
experienceSchema.index({ createdAt: -1 });

// Méthode virtuelle pour obtenir le nom complet du domaine
experienceSchema.virtual('domainDisplayName').get(function() {
  const domainNames = {
    'Développement logiciel': 'Développement logiciel',
    'Développement web': 'Développement web',
    'Systèmes d\'information': 'Systèmes d\'information',
    'Business Intelligence': 'Business Intelligence',
    'Data': 'Data & IA',
    'Cybersécurité ': 'Cybersécurité',
    'Conseil': 'Conseil & stratégie',
    'Management de projet': 'Management de projet',
    'Transformation numérique': 'Transformation numérique',
    'Innovation': 'Innovation & R&D',
  };
  return domainNames[this.domain] || this.domain;
});

// Méthode pour obtenir un résumé court
experienceSchema.virtual('shortDescription').get(function() {
  if (this.description.length <= 150) {
    return this.description;
  }
  return this.description.substring(0, 147) + '...';
});

// S'assurer que les virtuels sont inclus dans JSON
experienceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Experience', experienceSchema);