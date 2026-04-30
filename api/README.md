# CoopLedger API

Express.js backend for the CoopLedger platform, enabling farmers to vote on cooperative decisions through a blockchain-inspired transparent system.

## Tech Stack

- **Runtime**: Node.js 22
- **Language**: TypeScript
- **Framework**: Express.js 5
- **Auth**: Better-Auth
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Cache/Queue**: Redis + BullMQ
- **Real-time**: Socket.io
- **WhatsApp**: GOWA API v8.4.0
- **Bundler**: esbuild

## Environment Variables

| Variable | Description | Required |
|----------|-----------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |
| `BETTER_AUTH_SECRET` | Secret for Better-Auth | Yes |
| `BETTER_AUTH_URL` | Base URL (e.g., http://localhost:3000) | Yes |
| `REDIS_URL` | Redis connection URL | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `GOWA_URL` | GOWA API URL | Yes |
| `GOWA_AUTH_USER` | GOWA basic auth username | Yes |
| `GOWA_AUTH_PASSWORD` | GOWA basic auth password | Yes |
| `GOWA_DEFAULT_DEVICE_ID` | Default WhatsApp device ID | No |
| `GOWA_WEBHOOK_SECRET` | Secret for webhook HMAC | No |
| `PORT` | Server port (default: 3000) | No |

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The build outputs a single `dist/server.cjs` file.

### Start Server

```bash
npm start
```

## API Endpoints

### Authentication (Better-Auth)

All endpoints under `/api/auth/*` - see [better-auth docs](https://www.better-auth.com)

### WhatsApp Verification

```bash
# Send verification code
POST /api/auth/whatsapp/send-code
Body: { "userId": "user_xxx", "phoneNumber": "+1234567890" }

# Verify code
POST /api/auth/whatsapp/verify
Body: { "userId": "user_xxx", "code": "123456" }
```

### Webhook

```bash
# GOWA webhook endpoint
POST /webhook/whatsapp
Headers: { "x-hub-signature-256": "sha256=..." }
```

## Docker

### Build

```bash
docker build -t coopledger-api .
```

### Run

```bash
docker run -p 3000:3000 --env-file .env coopledger-api
```

### GHCR (GitHub Container Registry)

Tag and push:
```bash
git tag v0.1.0
git push origin v0.1.0
```

This triggers the GitHub Actions workflow to build and push to `ghcr.io/georgesnoe/coopledger/api:v0.1.0`

## Project Structure

```
src/
├── db/
│   ├── config.ts    # Database connection
│   └── schema.ts   # Drizzle schema
├── lib/
│   ├── auth.ts           # Better-Auth config
│   ├── whatsapp.ts      # GOWA service
│   ├── whatsapp-auth.ts # Verification service
│   └── vote-worker.ts  # BullMQ worker
└── server.ts      # Express server
```

## License

MIT