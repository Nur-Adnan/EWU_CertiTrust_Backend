# CertiTrust (backend)

Express and MongoDB API for [CertiTrust](https://github.com/Nur-Adnan/EWU_CertiTrust_Frontend), a blockchain-based system for issuing and verifying academic certificates.

## What it provides

- Route modules for users, profiles, students, faculty, exam controllers, courses, course assignment and grades
- Mongoose models for each of those resources
- Authentication with the Magic Admin SDK and JSON Web Tokens
- Request validation with `express-validator`, plus Helmet, CORS and Morgan logging
- Email delivery with Nodemailer

## Getting started

```bash
git clone https://github.com/Nur-Adnan/EWU_CertiTrust_Backend.git
cd EWU_CertiTrust_Backend
npm install
cp .env.example .env
npm run dev
```

## Environment variables

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `NODE_ENV` | `development` or `production` |
| `PORT` | Port the API listens on |
| `AUTH_KEY` | Magic secret key |

Keep real values in `.env`, which is git-ignored.
