# MalagasyFlix — Netflix malgache (SaaS)

Plateforme SaaS de streaming vidéo dédiée aux films et séries malgaches, avec abonnement mensuel et flux de paiement mobile money local (MVola, Orange Money Madagascar, Airtel Money).

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + JWT
- Base de données: MongoDB
- Streaming: MP4 / HLS (HTML5 + hls.js)

## Structure
```
/backend
/frontend
```

## Fonctionnalités livrées
- Authentification: inscription/connexion, JWT, profil.
- Gestion d’abonnement: trial 7 jours, actif/inactif, blocage de lecture sans abonnement.
- Catalogue malgache: recherche par titre, filtre catégorie.
- Streaming HTML5: lecture MP4 et HLS adaptatif.
- Favoris: ajout/retrait.
- Paiement mobile money (simulation): MVola / Orange Money / Airtel Money.
- Admin panel: utilisateurs, paiements, validation abonnement, dashboard KPI.
- Bonus: anti-partage compte (limite sessions), historique de visionnage, recommandations basées sur historique.

## Installation locale

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
API: `http://localhost:5000/api`

## Comptes de démonstration
- Admin (créé au seed)
  - Email: `admin@malagasyflix.mg`
  - Mot de passe: `Admin1234!`
- Utilisateur: créez via l’écran d’inscription.

## Flux paiement local (simulation)
1. L’utilisateur choisit une méthode mobile money.
2. Saisit son numéro + référence transaction.
3. Si référence commence par `auto-`, validation automatique.
4. Sinon, paiement `pending` à valider dans l’admin panel.

## API REST (extraits)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/content?q=&category=`
- `GET /api/content/:id` (abonnement requis)
- `POST /api/user/favorites/toggle`
- `POST /api/payments`
- `PATCH /api/payments/:id/validate` (admin)
- `GET /api/admin/dashboard` (admin)

## Déploiement

### Render (backend)
- Root: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Variables: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, etc.

### Vercel (frontend)
- Root: `frontend`
- Build command: `npm run build`
- Output: `dist`
- Env: `VITE_API_URL=https://<render-service>/api`

## Notes optimisation Madagascar
- Préférer flux HLS pour adaptation de qualité.
- Posters optimisés (WebP recommandé en prod).
- Préchargement léger + UI mobile-first.
- Ajouter CDN régional pour améliorer la latence.
