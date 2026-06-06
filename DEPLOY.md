# Guide de déploiement MyChurch APP

## Architecture
- **Frontend** : Vercel (React + Vite)
- **Backend** : Render (ASP.NET Core 8 + Docker)
- **Base de données** : SQLite (stockée sur Render)

---

## 1. Déployer le Backend sur Render

1. Aller sur https://render.com → New → Web Service
2. Connecter votre repo GitHub `mychurch-app`
3. Configurer :
   - **Name** : mychurch-api
   - **Root Directory** : backend
   - **Runtime** : Docker
   - **Plan** : Free
4. Ajouter les variables d'environnement :

| Variable | Valeur |
|----------|--------|
| ASPNETCORE_ENVIRONMENT | Production |
| ASPNETCORE_URLS | http://+:8080 |
| Jwt__Key | (secret 32+ caractères) |
| Jwt__Issuer | MyChurchAPI |
| Jwt__Audience | MyChurchApp |
| AllowedOrigins | https://mychurch-app.vercel.app |
| YouTube__ApiKey | (optionnel) |
| Stripe__SecretKey | (optionnel) |

5. Cliquer **Create Web Service**
6. Noter l'URL générée : `https://mychurch-api.onrender.com`

---

## 2. Déployer le Frontend sur Vercel

1. Aller sur https://vercel.com → New Project
2. Importer le repo GitHub `mychurch-app`
3. Configurer :
   - **Root Directory** : frontend
   - **Framework** : Vite
   - **Build Command** : npm run build
   - **Output Directory** : dist
4. Ajouter la variable d'environnement :

| Variable | Valeur |
|----------|--------|
| VITE_API_URL | https://mychurch-api.onrender.com |

5. Cliquer **Deploy**
6. URL générée : `https://mychurch-app.vercel.app`

---

## 3. Mettre à jour AllowedOrigins sur Render

Une fois Vercel déployé, mettez à jour la variable `AllowedOrigins` sur Render
avec l'URL exacte de votre app Vercel.

---

## Développement local

### Backend
```bash
cd backend
$env:ASPNETCORE_ENVIRONMENT = "Development"
dotnet run --project MyChurch.API
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
