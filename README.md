# CoopLedger

A blockchain-based platform enabling farmers to collaboratively participate and vote on decisions for responsible and transparent agricultural management.

## Project Structure

```
coopledger/
├── api/              # Backend API (Express + Better-Auth + Socket.io + BullMQ)
├── mobile/           # Mobile application
└── landing/         # Landing page website
```

## Architecture

### API (`api/`)
- **Framework**: Express.js with TypeScript
- **Auth**: Better-Auth with email/password and Google OAuth
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Real-time**: Socket.io for live vote updates
- **Queue**: BullMQ for background notifications
- **WhatsApp**: GOWA API integration for messaging
- **Container**: Docker-ready with multi-stage build

## Environment Variables

| Variable | Description |
|----------|------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Secret key for Better-Auth |
| `BETTER_AUTH_URL` | Base URL of the API |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `REDIS_URL` | Redis connection for sessions/queue |
| `GOWA_URL` | GOWA API URL for WhatsApp |
| `GOWA_AUTH_USER` | GOWA basic auth username |
| `GOWA_AUTH_PASSWORD` | GOWA basic auth password |

## Features

- **Cooperative Management**: Create and manage farmer cooperatives
- **Voting System**: Transparent voting with real-time results
- **WhatsApp Notifications**: Vote alerts via GOWA
- **Account Verification**: WhatsApp-based verification codes
- **Real-time Updates**: Socket.io for live vote status

## Getting Started

### API

```bash
cd api
cp .env.example .env
# Configure environment variables
npm install
npm run dev    # Development
npm run build  # Production build
npm start      # Start server
```

### Docker

```bash
cd api
docker build -t coopledger-api .
docker run -p 3000:3000 --env-file .env coopledger-api
```

## License

MIT