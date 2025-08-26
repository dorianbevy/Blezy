# Blézy Boulangerie - Application Web

## 🚀 Démarrage rapide

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install

# Lancer la base de données JSON Server
npm run db

# Dans un autre terminal, lancer l'application React
npm run dev
```

## 🗄️ Base de données

Cette application utilise **JSON Server** comme base de données de développement. C'est une solution simple et efficace pour le prototypage.

### Structure de la base de données

#### Catégories (`/categories`)
```json
{
  "id": 1,
  "name": "Pains",
  "description": "Pains traditionnels et spéciaux",
  "image": "./src/img/pain_2.jpg",
  "order": 1
}
```

#### Produits (`/products`)
```json
{
  "id": 1,
  "categoryId": 1,
  "name": "Baguette tradition",
  "description": "Levain naturel, farine locale T65",
  "price": 1.10,
  "available": true,
  "image": "./src/img/pain_2.jpg"
}
```

### API Endpoints

#### Catégories
- `GET /categories` - Récupérer toutes les catégories
- `GET /categories/:id` - Récupérer une catégorie par ID
- `POST /categories` - Créer une nouvelle catégorie
- `PUT /categories/:id` - Mettre à jour une catégorie
- `DELETE /categories/:id` - Supprimer une catégorie

#### Produits
- `GET /products` - Récupérer tous les produits
- `GET /products/:id` - Récupérer un produit par ID
- `GET /products?categoryId=:id` - Récupérer les produits par catégorie
- `POST /products` - Créer un nouveau produit
- `PUT /products/:id` - Mettre à jour un produit
- `DELETE /products/:id` - Supprimer un produit

## 🛠️ Fonctionnalités

### Panel d'administration
- **Tableau de bord** : Vue d'ensemble avec statistiques
- **Gestion des catégories** : CRUD complet
- **Gestion des produits** : CRUD complet avec prix et disponibilité
- **Interface moderne** : Design responsive avec Tailwind CSS

### Site principal
- Affichage des produits organisés par catégories
- Design responsive et moderne
- Navigation fluide

## 🔧 Configuration

### Ports utilisés
- **Application React** : 5173 (ou port disponible)
- **Base de données** : 3001

### Variables d'environnement
Créez un fichier `.env.local` à la racine du projet :
```env
VITE_API_BASE_URL=http://localhost:3001
```

## 📁 Structure du projet

```
Blézy/
├── src/
│   ├── components/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminPanelDB.jsx      # Nouveau panel avec base de données
│   │   ├── BoulangerieSite.jsx
│   │   └── TestComponent.jsx
│   ├── services/
│   │   └── api.js               # Service API pour la base de données
│   └── img/                     # Images du site
├── db.json                      # Base de données JSON Server
├── main.jsx                     # Point d'entrée de l'application
├── package.json
└── README.md
```

## 🚀 Déploiement

### Production
```bash
# Construire l'application
npm run build

# Prévisualiser la production
npm run preview
```

### Base de données en production
Pour la production, remplacez JSON Server par une vraie base de données :
- **PostgreSQL** avec Prisma
- **MongoDB** avec Mongoose
- **MySQL** avec Sequelize

## 🐛 Dépannage

### Base de données ne démarre pas
```bash
# Vérifier que le port 3001 est libre
netstat -an | findstr :3001

# Redémarrer le serveur
npm run db
```

### Erreurs CORS
Assurez-vous que l'URL de l'API dans `src/services/api.js` correspond au port de JSON Server.

### Données ne se chargent pas
Vérifiez que :
1. JSON Server est en cours d'exécution sur le port 3001
2. Le fichier `db.json` existe et contient des données valides
3. L'API est accessible via `http://localhost:3001/categories`

## 📝 Notes de développement

- **JSON Server** est parfait pour le développement et le prototypage
- **Tailwind CSS** est utilisé pour le styling
- **React Hooks** pour la gestion d'état
- **Fetch API** pour les appels HTTP

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
