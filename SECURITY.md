# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, email: security@sunleaf.com

Include:

- Description of the vulnerability
- Steps to reproduce
- Affected versions
- Potential impact

We will respond within 48 hours.

## Security Measures

### Backend

- ✅ JWT authentication with secure secrets
- ✅ Password hashing (bcrypt, cost factor 12)
- ✅ Helmet.js security headers
- ✅ Rate limiting (100 req/15min)
- ✅ Input validation (Zod)
- ✅ SQL injection prevention (Prisma ORM)
- ✅ CORS configuration
- ✅ Environment variable protection

### Frontend

- ✅ XSS protection (React escaping)
- ✅ HTTPS enforcement
- ✅ Secure token storage
- ✅ CSP headers (via Helmet)

### Infrastructure

- ✅ HTTPS/TLS 1.3
- ✅ PostgreSQL over TLS
- ✅ Secrets in environment variables (not in code)
- ✅ Regular dependency updates
- ✅ Automated security scanning (GitHub Actions)

## OWASP Top 10 (2021) Mitigation

1. **A01 Broken Access Control**: JWT + role-based authorization
2. **A02 Cryptographic Failures**: bcrypt, HTTPS, TLS
3. **A03 Injection**: Prisma ORM, Zod validation
4. **A04 Insecure Design**: Threat modeling (STRIDE)
5. **A05 Security Misconfiguration**: Helmet.js, secure defaults
6. **A06 Vulnerable Components**: npm audit, Dependabot
7. **A07 Authentication Failures**: JWT, strong passwords
8. **A08 Data Integrity**: Input validation, HTTPS
9. **A09 Logging Failures**: Structured logging, Sentry
10. **A10 SSRF**: No external requests without validation

## Dependency Management

- Run `npm audit` weekly
- Update dependencies monthly
- GitHub Dependabot enabled
- Trivy vulnerability scanning in CI

## Secrets Management

**Never commit**:

- Database credentials
- JWT secrets
- API keys
- Private keys

**Use**:

- `.env` files (local)
- Environment variables (production)
- Secret management services (AWS Secrets Manager, etc.)

## Incident Response

1. **Detection**: Automated monitoring + manual reports
2. **Assessment**: Severity evaluation
3. **Containment**: Isolate affected systems
4. **Eradication**: Fix vulnerability
5. **Recovery**: Deploy patch
6. **Lessons Learned**: Post-mortem

## Contact

- Security Team: security@sunleaf.com
- Bug Bounty: Not available yet
