# 🍃 Sunleaf E-Commerce

Production-ready e-commerce platform for coffee, tea, and sweets.

## 🚀 Features

- ✅ Product catalog with categories & search
- 🛒 Shopping cart with real-time updates
- 📦 Order checkout with delivery form
- 🔐 JWT authentication (register/login)
- 👨‍💼 Admin panel (CRUD products)
- 🌓 Dark/light mode
- 📱 Responsive design (WCAG 2.2 AA)
- ⚡ Performance: LCP <1.8s, API p95 <200ms
- 🔒 Security: HTTPS, OWASP Top 10, rate limiting

## 🛠 Tech Stack (100% Free)

**Frontend**: React 18 + Vite + TailwindCSS  
**Backend**: Node.js 20 + Express + Prisma  
**Database**: PostgreSQL (Supabase free tier)  
**Auth**: JWT (jsonwebtoken)  
**Storage**: Cloudinary (10GB free)  
**Hosting**: Vercel (frontend) + Render (backend)  
**CI/CD**: GitHub Actions  
**Monitoring**: Sentry + Grafana Cloud

## 📦 Prerequisites

- Node.js ≥20.0.0
- npm ≥10.0.0
- PostgreSQL (or Supabase account)

## 🏃 Quick Start

```bash
# 1. Clone & install
git clone <repo-url>
cd 12323
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET

# 3. Setup database
cd packages/backend
npx prisma migrate dev
npx prisma db seed

# 4. Run dev servers
cd ../..
npm run dev
# Frontend: http://localhost:5173
# Backend: http://localhost:3000

# 5. Run tests
npm test
npm run test:e2e
```

## 📂 Project Structure

```
12323/
├── packages/
│   ├── backend/          # Express API + Prisma
│   │   ├── src/
│   │   │   ├── routes/   # API endpoints
│   │   │   ├── middleware/ # Auth, validation
│   │   │   ├── services/ # Business logic
│   │   │   └── server.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│   └── frontend/         # React + Vite
│       ├── src/
│       │   ├── pages/    # Home, Catalog, Cart, Admin
│       │   ├── components/
│       │   ├── hooks/
│       │   └── main.tsx
│       └── package.json
├── .github/
│   └── workflows/        # CI/CD pipelines
├── package.json
└── README.md
```

## 🧪 Testing

- **Unit/Integration**: Jest (backend 80%+ coverage)
- **E2E**: Playwright (user flows)
- **SAST**: ESLint + npm audit
- **Accessibility**: axe-core + manual WCAG checks

## 🚢 Deployment

### Vercel (Frontend)
```bash
cd packages/frontend
vercel --prod
```

### Render (Backend)
1. Create PostgreSQL instance (free tier)
2. Create Web Service from GitHub
3. Set environment variables
4. Auto-deploy on push

## 📊 Performance

- **Lighthouse**: >90 (mobile/desktop)
- **LCP**: <1.8s
- **API p95**: <200ms
- **Coverage**: ≥80%

## 🔐 Security

- HTTPS enforced
- JWT with secure secrets
- Helmet.js headers
- Rate limiting (express-rate-limit)
- Input validation (Zod)
- OWASP dependency check

## 📝 License

MIT

## 👥 Support

Docs: [./docs](./docs)  
Issues: GitHub Issues
