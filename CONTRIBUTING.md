# Contributing Guide

## Getting Started

1. **Fork the repo**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sunleaf.git
   cd sunleaf
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Setup environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```
5. **Run migrations**:
   ```bash
   cd packages/backend
   npx prisma migrate dev
   npx prisma db seed
   ```
6. **Start development servers**:
   ```bash
   npm run dev
   ```

---

## Code Standards

### TypeScript
- Use strict mode
- No `any` types (use `unknown` or proper types)
- Prefer interfaces over types for objects

### React
- Functional components only
- Use hooks (no class components)
- Extract reusable logic to custom hooks

### Backend
- RESTful API design
- Input validation with Zod
- Error handling in middleware
- Prisma for database queries

### CSS
- TailwindCSS utility classes
- Responsive design (mobile-first)
- Dark mode support

---

## Git Workflow

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
3. **Commit** (follow conventional commits):
   ```bash
   git commit -m "feat: add product search"
   git commit -m "fix: cart total calculation"
   git commit -m "docs: update README"
   ```

4. **Push**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Tooling

**Example**:
```
feat(cart): add quantity increment button

- Add plus/minus buttons to cart items
- Update total in real-time
- Add tests for quantity updates

Closes #123
```

---

## Testing

### Run all tests
```bash
npm test
```

### Backend tests
```bash
cd packages/backend
npm test
npm test -- --coverage
```

### Frontend e2e tests
```bash
cd packages/frontend
npm run test:e2e
```

### Coverage requirements
- Lines: ≥80%
- Branches: ≥80%
- Functions: ≥80%

---

## Pull Request Checklist

- [ ] Code follows style guide
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Coverage ≥80%
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Commits follow convention
- [ ] PR title describes change
- [ ] Screenshots (if UI change)

---

## Code Review

All PRs require:
- ✅ 1 approval
- ✅ All CI checks pass
- ✅ No merge conflicts
- ✅ Up-to-date with main branch

---

## Questions?

- Open a GitHub issue
- Tag @maintainers in discussion
