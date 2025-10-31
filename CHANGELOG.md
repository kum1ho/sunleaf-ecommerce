# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-25

### Added

- ✅ Full e-commerce platform with catalog, cart, checkout
- 🔐 JWT authentication (register/login)
- 👨‍💼 Admin panel for product management
- 🛒 Shopping cart with persistence (localStorage)
- 📦 Order management system
- 🌓 Dark/light mode toggle
- 📱 Responsive design (mobile/tablet/desktop)
- ♿ WCAG 2.2 AA accessibility
- ⚡ Performance optimizations (LCP <1.8s)
- 🔒 Security features (Helmet, rate limiting, JWT)
- 🧪 Test coverage >80% (Jest + Playwright)
- 🚀 CI/CD pipeline (GitHub Actions)
- 📊 Health check endpoints
- 🐳 Docker support
- 📝 Complete documentation

### Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Node.js 20 + Express + Prisma
- **Database**: PostgreSQL
- **Auth**: JWT
- **Testing**: Jest + Playwright
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (frontend) + Render (backend)

### Security

- HTTPS enforced
- JWT with secure secrets
- Helmet.js security headers
- Rate limiting
- Input validation (Zod)
- OWASP dependency scanning
- Environment variable protection

### Performance

- Lighthouse score >90
- LCP <1.8s
- API p95 <200ms
- Code splitting
- Image optimization
- Lazy loading

### Accessibility

- WCAG 2.2 AA compliant
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management
- High contrast support
