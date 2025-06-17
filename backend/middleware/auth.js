// backend/middleware/auth.js - Middleware d'authentification
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('🔑 Token reçu:', token ? 'Présent' : 'Absent');
    
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('🔓 Token décodé, userId:', decoded.userId);
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé pour ID:', decoded.userId);
      return res.status(401).json({ message: 'Token invalide.' });
    }

    console.log('✅ Utilisateur authentifié:', user.email);
    req.userId = user._id;
    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Erreur authentification:', error.message);
    res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = auth;