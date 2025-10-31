# Architecture Decision Record (ADR)

## ADR-001: Monorepo Structure

**Date**: 2025-10-25  
**Status**: Accepted

### Context

Need to manage frontend and backend in same repository for easier development and deployment.

### Decision

Use npm workspaces monorepo with packages/frontend and packages/backend.

### Consequences

**Positive**:

- Shared tooling (ESLint, Prettier)
- Atomic commits across stack
- Easier CI/CD

**Negative**:

- Larger repository size
- More complex dependency management

---

## ADR-002: PostgreSQL over MongoDB

**Date**: 2025-10-25  
**Status**: Accepted

### Context

E-commerce requires ACID transactions, relational data (orders, users, products).

### Decision

Use PostgreSQL with Prisma ORM.

### Consequences

**Positive**:

- Strong consistency
- Foreign keys & transactions
- Free tier on Supabase/Render

**Negative**:

- Less flexible schema changes
- Requires migrations

---

## ADR-003: JWT over Session Cookies

**Date**: 2025-10-25  
**Status**: Accepted

### Context

Need stateless authentication for scalability.

### Decision

Use JWT stored in localStorage, sent via Authorization header.

### Consequences

**Positive**:

- Stateless (no DB lookups)
- Works across domains
- Easy to scale

**Negative**:

- XSS risk (mitigated with Helmet CSP)
- Cannot revoke tokens (add blacklist if needed)

---

## ADR-004: TailwindCSS over Bootstrap

**Date**: 2025-10-25  
**Status**: Accepted

### Context

Need utility-first CSS framework for rapid prototyping + dark mode.

### Decision

Use TailwindCSS with custom theme.

### Consequences

**Positive**:

- Small bundle size (purged)
- Built-in dark mode
- Highly customizable

**Negative**:

- Steeper learning curve
- Verbose class names

---

## ADR-005: Zustand over Redux

**Date**: 2025-10-25  
**Status**: Accepted

### Context

Need lightweight state management for cart + auth.

### Decision

Use Zustand with persistence middleware.

### Consequences

**Positive**:

- Minimal boilerplate
- <1KB bundle
- Simple API

**Negative**:

- Less ecosystem than Redux
- No DevTools (unless added)

---

## ADR-006: Render Free Tier over Heroku

**Date**: 2025-10-25  
**Status**: Accepted

### Context

Need free backend hosting after Heroku removed free tier.

### Decision

Use Render free tier (750h/mo).

### Consequences

**Positive**:

- 100% free
- Auto-deploy from Git
- Managed PostgreSQL

**Negative**:

- Cold starts (~30s)
- 512MB RAM limit

---

## ADR-007: Vercel over Netlify

**Date**: 2025-10-25  
**Status**: Accepted

### Context

Need free frontend hosting with fast builds.

### Decision

Use Vercel (optimized for Vite/React).

### Consequences

**Positive**:

- Instant deploys (<30s)
- Edge caching
- 100GB bandwidth/mo

**Negative**:

- Less control than self-hosted
