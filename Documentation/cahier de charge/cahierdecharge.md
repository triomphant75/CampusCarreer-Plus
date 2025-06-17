# 📘 Cahier des charges – CampusCareer+ Web

---

## ✅ Résumé exécutif

**CampusCareer+** est une plateforme web destinée aux étudiants de l’Institut des Sciences du Digital, Management et Cognition (IDMC) pour partager leurs expériences de stage/alternance (entreprises, missions, postes, contacts) et permettre à d'autres étudiants de trouver des opportunités similaires automatiquement.

Grâce à un système d’analyse intelligente de texte (**NLP**) et des recherches en temps réel sur des plateformes comme **LinkedIn**, **Indeed**, ou les sites carrières d’entreprises, l'application recommande des offres d’emploi pertinentes liées aux expériences partagées.

🎯 **Objectif :** booster l'entraide entre promotions et simplifier l'accès aux opportunités professionnelles.

---

## 1. 🎯 Objectifs du projet

- Créer une base communautaire d’expériences de stages et alternances  
- Offrir une recommandation automatique d’offres similaires  
- Valoriser les retours étudiants comme levier pour les futures promotions  
- Permettre la recherche par entreprise, domaine, promo, compétence  

---

## 2. 👥 Public cible

- Étudiants actuels (L3, M1, M2)  
- Alumni (anciens étudiants)  
- Responsables pédagogiques  

---

## 3. 🧩 Fonctionnalités principales (MVP Web)

### 🔐 Authentification
- Connexion avec email universitaire ou Google  
- Gestion des rôles : étudiant, admin  

### 🧑‍🎓 Module d’expérience
- Formulaire : entreprise, poste, missions, durée, année, contact (optionnel)  
- Enregistrement sécurisé dans la base de données  
- Modification/suppression par l’auteur  

### 🧠 Analyse automatique & matching
- Extraction des compétences, domaine, titre (NLP)  
- Requête intelligente vers LinkedIn, Indeed ou site entreprise  
- Affichage d’offres en temps réel avec lien "Postuler"  

### 🔍 Recherche intelligente
- Moteur de recherche full-text  
- Filtres dynamiques : entreprise, domaine, poste, promo, mots-clés  

### 🧾 Visualisation collective
- Liste publique des expériences postées (avec tri et filtres)  
- Fiches consultables anonymisées ou avec contact (si autorisé)  

### 📊 Statistiques communautaires (optionnel)
- Répartition par entreprise / domaine  
- Top 10 entreprises / secteurs les plus fréquents  
- Histogrammes des postes et compétences les plus cités  

---

## 4. 🧱 Architecture technique

| Composant           | Technologie recommandée             |
|---------------------|-------------------------------------|
| **Frontend**        | React.js + Tailwind CSS             |
| **Backend**         | Node.js (Express)        |
| **Base de données** | MongoDB               |
| **NLP**             | spaCy / OpenAI API (optionnel)      |
| **Recherche externe** | google / linkedin / Indeed  |
| **Authentification**| Firebase Auth / JWT + OAuth2        |

---

