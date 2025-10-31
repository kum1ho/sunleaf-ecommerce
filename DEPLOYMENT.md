# 🚀 Deployment Guide

## Prerequisites

- Node.js 20+
- PostgreSQL database (or Supabase account)
- Vercel account (free)
- Render account (free) OR Railway

---

## Option 1: Vercel + Render (Recommended)

### Backend on Render

1. **Create PostgreSQL Database**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - New → PostgreSQL
   - Name: `sunleaf-db`
   - Plan: **Free**
   - Copy **Internal Database URL**

2. **Create Web Service**
   - New → Web Service
   - Connect GitHub repository
   - Name: `sunleaf-backend`
   - Environment: Node
   - Build Command: `npm run build --workspace=packages/backend`
   - Start Command: `npm start --workspace=packages/backend`
   - **Environment Variables**:
     ```
     DATABASE_URL=<your-postgres-internal-url>
     JWT_SECRET=<generate-random-32-char-string>
     NODE_ENV=production
     ```
   - Plan: **Free**

3. **Run Migrations**
   - In Render Shell:
     ```bash
     cd packages/backend
     npx prisma migrate deploy
     npx prisma db seed
     ```

### Frontend on Vercel

1. **Deploy**

   ```bash
   cd packages/frontend
   vercel --prod
   ```

2. **Environment Variables** (in Vercel dashboard):

   ```
   VITE_API_URL=https://sunleaf-backend.onrender.com
   ```

3. **Build Settings**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

---

## Option 2: Docker + Any Cloud

```bash
# Build
docker-compose build

# Run
docker-compose up -d

# Migrations
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npx prisma db seed
```

Deploy to:

- **Fly.io** (free tier)
- **Railway** (free tier)
- **DigitalOcean App Platform** ($5/mo)

---

## Option 3: Supabase (Database) + Vercel + Render

### Supabase (Free PostgreSQL)

1. Create project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy **Connection String** (use Pooling)
4. Use as `DATABASE_URL`

### Same deployment steps as Option 1

---

## Environment Variables Checklist

### Backend

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=<min-32-chars>
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3000
```

### Frontend

```env
VITE_API_URL=https://your-backend.com
```

---

## Post-Deployment

1. **Test API**: `curl https://your-backend.com/health`
2. **Seed Data**: Run seed script in Render shell
3. **Create Admin**:

   ```bash
   # In backend shell
   npx prisma studio
   # Change user role to ADMIN
   ```

4. **Monitor**:
   - Render Logs
   - Vercel Analytics

---

## Estimated Costs

- **100% Free** (Render + Vercel + Supabase):
  - Render: 750h/mo free
  - Vercel: 100GB bandwidth
  - Supabase: 500MB DB

- **Paid** (for production):
  - Render: $7/mo (512MB RAM)
  - Vercel: Free (hobby)
  - Supabase: $25/mo (8GB DB)

---

## Troubleshooting

### Backend won't start

- Check DATABASE_URL format
- Ensure migrations ran
- Check logs: `render logs -t`

### Frontend can't reach API

- Verify VITE_API_URL
- Check CORS settings in backend
- Ensure backend is running

### Database connection fails

- Use **Internal URL** on Render
- Check firewall rules
- Verify credentials

---

## Rollback

```bash
# Render
render rollback <service-id>

# Vercel
vercel rollback <deployment-url>
```
