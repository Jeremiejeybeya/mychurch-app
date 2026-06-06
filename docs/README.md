# MyChurch APP — Documentation

## Stack Technique

| Couche | Technologie |
|--------|------------|
| Frontend | React 18 + TypeScript + Vite + Tailwind CSS |
| État global | Zustand + TanStack React Query |
| Backend | ASP.NET Core 8 (Clean Architecture) |
| Base de données | SQL Server + EF Core 8 |
| Auth | ASP.NET Identity + JWT |
| Paiements | Stripe |
| Vidéo | YouTube Data API v3 |
| Stockage | Azure Blob Storage |
| Mobile (Phase 2) | .NET MAUI |

## Architecture Backend

```
MyChurch.Domain         -> Entités, Enums (0 dépendances)
MyChurch.Application    -> DTOs, Interfaces, logique métier
MyChurch.Infrastructure -> EF Core, Stripe, YouTube, Azure
MyChurch.API            -> Controllers, JWT, Swagger
```

## Démarrage

### Backend
```bash
cd backend
# Configurer appsettings.json (DB, JWT, Stripe, YouTube)
dotnet ef migrations add Init --project MyChurch.Infrastructure --startup-project MyChurch.API
dotnet ef database update --startup-project MyChurch.API
dotnet run --project MyChurch.API
# Swagger: https://localhost:7000/swagger
```

### Frontend
```bash
cd frontend
npm install && npm run dev
# App: http://localhost:5173
```

## Variables à configurer (appsettings.json)

- ConnectionStrings.DefaultConnection : chaine SQL Server
- Jwt.Key : secret 32+ caractères
- YouTube.ApiKey + ChannelId
- Stripe.PublishableKey + SecretKey + WebhookSecret

## Endpoints API principaux

| Route | Accès | Description |
|-------|-------|-------------|
| POST /api/auth/register | Public | Inscription |
| POST /api/auth/login | Public | Connexion + JWT |
| GET  /api/sermons | Public | Prédications |
| GET  /api/sermons/live | Public | Statut direct YouTube |
| GET  /api/events/upcoming | Public | Prochains événements |
| POST /api/events/{id}/register | Auth | S'inscrire |
| POST /api/donations/intent | Public | Créer paiement Stripe |
| GET  /api/departments | Public | Départements |
| POST /api/gallery | Admin/Leader | Upload photo |

## Rôles

Member -> Voir tout, s'inscrire, donner
Leader -> + Gérer département, créer activités
Pastor -> + Prédications, événements
Admin  -> Accès complet

## Évolutions prévues

- Notifications push (Firebase)
- Demandes de prière
- Petits groupes / Cells
- Annuaire membres
- Tableau de bord Admin complet
- App mobile .NET MAUI

## Déploiement recommandé (Azure)

- Backend : Azure App Service (.NET 8)
- DB      : Azure SQL Database
- Fichiers: Azure Blob Storage
- Frontend: Azure Static Web Apps
