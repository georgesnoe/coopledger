# CoopLedger

Plateforme de gestion coopérative avec paiements mobiles, votes numériques et traçabilité blockchain.

## Architecture

```
coopledger/
├── api/          # API Express.js (TypeScript, Prisma, PostgreSQL)
├── mobile/       # App React Native (Expo Router)
├── blockchain/   # Smart contracts et workers blockchain
└── .github/      # Workflows CI/CD
```

## Stack

| Couche        | Technologie                                      |
| ------------- | ------------------------------------------------ |
| **Backend**   | Express 5, TypeScript, Prisma, PostgreSQL        |
| **Mobile**    | React Native, Expo Router, Better Auth           |
| **Paiements** | FedaPay API (sandbox)                            |
| **Stockage**  | Pinata (IPFS), Cloudinary                        |
| **WhatsApp**  | GOWA API (notifications OTP et votes)            |
| **Blockchain**| BullMQ workers pour séquence atomique            |
| **CI/CD**     | Docker, GitHub Actions                           |

## Prérequis

- Node.js >= 20
- PostgreSQL
- Expo CLI
- Comptes : FedaPay, Pinata, Cloudinary

## Installation

```bash
# API
cd api
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev

# Mobile
cd mobile
cp .env.example .env
npm install
npx expo start
```

## Tags

- `v*.*.*` — Versions API
- `m*.*.*` — Versions Mobile

## Fonctionnalités

- Onboarding WhatsApp (OTP)
- Création et gestion de coopératives
- Dépôt de documents (statuts, preuves)
- Votes numériques avec propositions
- Paiements cotisations via FedaPay
- Notifications WhatsApp automatisées
- Dashboard membres et finances
