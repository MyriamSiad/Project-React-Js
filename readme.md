# 📺 Application de visionnage de vidéos

## 📝 Description

Cette application web a été développée **en 2 jours**, dans le cadre de ma **formation**, avec un objectif clair : concevoir une application complète, fonctionnelle et structurée, proche des standards professionnels.

Elle permet aux utilisateurs de rechercher et visionner des vidéos, de créer un compte, de se connecter, d’ajouter des vidéos en favoris et de conserver un historique des vidéos regardées par utilisateur.

L’application propose également un format **shorts** (vidéos courtes), inspiré des usages actuels, afin de démontrer la capacité à concevoir une expérience utilisateur moderne.

Les vidéos sont consommées via l’**API Pixabay**. Le projet repose sur une architecture **MERN**, avec une gestion globale de l’état côté front grâce au **React Context**.

Ce dépôt GitHub met en avant ma capacité à **concevoir rapidement**, **structurer proprement** et **livrer une application fullstack fonctionnelle dans un temps contraint**.

---

## 🚀 Fonctionnalités clés (orientées produit)

- 🔍 Recherche et visionnage de vidéos via l’API Pixabay
- 👤 Création de compte utilisateur
- 🔐 Authentification sécurisée (JWT)
- ⭐ Ajout et suppression de vidéos en favoris
- 🕒 Historique des vidéos visionnées par utilisateur
- 📱 Visionnage de vidéos au format *shorts*
- 🔄 Gestion de l’état global avec React Context
- 🌐 Navigation multi-pages avec React Router

---

## 🛠️ Technologies utilisées

### Frontend
- **React.js**
- **React Router**
- **React Context API**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (Base de données NoSQL)
- **Mongoose**

### Sécurité & utilitaires
- **bcryptjs** (hashage des mots de passe)
- **jsonwebtoken (JWT)** (authentification)
- **dotenv** (variables d’environnement)
- **cors**

### API externe
- **Pixabay API** (vidéos)

---

## 🗄️ Base de données

- Base de données **NoSQL MongoDB**
- Stockage des utilisateurs, favoris et historiques de visionnage
- Relations gérées via les identifiants MongoDB

---

## 📁 Structure du projet (simplifiée)

```
project-root/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation et lancement

### Prérequis
- Node.js
- MongoDB
- Clé API Pixabay

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/votre-username/nom-du-repo.git
cd nom-du-repo
```

### 2️⃣ Installation des dépendances

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3️⃣ Configuration des variables d’environnement

Créer un fichier `.env` dans le dossier `backend` :

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PIXABAY_API_KEY=your_pixabay_api_key
```

---

### 4️⃣ Lancer l’application

#### Backend
```bash
npm run dev
```

#### Frontend
```bash
npm start
```

L’application sera accessible sur :
- Frontend : `http://localhost:3000`
- Backend : `http://localhost:5000`

---

## 🔐 Sécurité

- Mots de passe hashés avec **bcryptjs**
- Authentification via **JWT**
- Routes protégées côté backend

---

## 📌 Améliorations possibles

- Pagination des vidéos
- Système de likes
- Profils utilisateurs personnalisés
- Mode sombre
- Refresh token JWT

---

## 👨‍💻 Contexte du projet

Projet réalisé **en 2 jours** dans le cadre de ma **formation en développement web / fullstack**.

L’objectif était de :
- Mettre en pratique une stack **React / Node.js / MongoDB**
- Implémenter une authentification sécurisée
- Consommer une API externe
- Structurer un projet comme en environnement professionnel

Ce projet illustre ma capacité à **prioriser les fonctionnalités essentielles**, **travailler efficacement sous contrainte de temps**, et **livrer un produit cohérent et maintenable**.

---

## 📄 Licence

Ce projet est open-source et libre d’utilisation.

