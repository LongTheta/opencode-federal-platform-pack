---
name: security-review
description: Use this skill when adding authentication, handling user input, working with secrets, creating API endpoints, or implementing payment/sensitive features. Provides comprehensive security checklist and patterns.
origin: ECC (federal platform pack)
---

# Security Review Skill

This skill ensures all code follows security best practices and identifies potential vulnerabilities.

## When to Activate

- Implementing authentication or authorization
- Handling user input or file uploads
- Creating new API endpoints
- Working with secrets or credentials
- Implementing payment features
- Storing or transmitting sensitive data
- Integrating third-party APIs

## Security Checklist

### 1. Secrets Management

#### ❌ NEVER Do This
```typescript
const apiKey = "sk-proj-xxxxx"  // Hardcoded secret
const dbPassword = "password123" // In source code
```

#### ✅ ALWAYS Do This
```typescript
const apiKey = process.env.OPENAI_API_KEY
const dbUrl = process.env.DATABASE_URL

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

### 2. Input Validation

- All user inputs validated with schemas (e.g., Zod)
- File uploads restricted (size, type, extension)
- No direct use of user input in queries
- Whitelist validation (not blacklist)
- Error messages don't leak sensitive info

### 3. SQL Injection Prevention

#### ❌ NEVER Concatenate SQL
```typescript
const query = `SELECT * FROM users WHERE email = '${userEmail}'`
```

#### ✅ ALWAYS Use Parameterized Queries
```typescript
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userEmail)

await db.query('SELECT * FROM users WHERE email = $1', [userEmail])
```

### 4. Authentication & Authorization

- Tokens stored in httpOnly cookies (not localStorage)
- Authorization checks before sensitive operations
- Row Level Security enabled in Supabase
- Role-based access control implemented
- Session management secure

### 5. XSS Prevention

- User-provided HTML sanitized (DOMPurify)
- CSP headers configured
- No unvalidated dynamic content rendering
- React's built-in XSS protection used

### 6. CSRF Protection

- CSRF tokens on state-changing operations
- SameSite=Strict on all cookies
- Double-submit cookie pattern implemented

### 7. Rate Limiting

- Rate limiting on all API endpoints
- Stricter limits on expensive operations
- IP-based and user-based rate limiting

### 8. Sensitive Data Exposure

- No passwords, tokens, or secrets in logs
- Error messages generic for users
- Detailed errors only in server logs
- No stack traces exposed to users

### 9. Dependency Security

```bash
npm audit
npm audit fix
npm update
npm outdated
```

- Dependencies up to date
- No known vulnerabilities (npm audit clean)
- Lock files committed
- Dependabot enabled on GitHub

## Pre-Deployment Security Checklist

Before ANY production deployment:

- [ ] **Secrets**: No hardcoded secrets, all in env vars
- [ ] **Input Validation**: All user inputs validated
- [ ] **SQL Injection**: All queries parameterized
- [ ] **XSS**: User content sanitized
- [ ] **CSRF**: Protection enabled
- [ ] **Authentication**: Proper token handling
- [ ] **Authorization**: Role checks in place
- [ ] **Rate Limiting**: Enabled on all endpoints
- [ ] **HTTPS**: Enforced in production
- [ ] **Security Headers**: CSP, X-Frame-Options configured
- [ ] **Error Handling**: No sensitive data in errors
- [ ] **Logging**: No sensitive data logged
- [ ] **Dependencies**: Up to date, no vulnerabilities

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/security)
- [Supabase Security](https://supabase.com/docs/guides/auth)

---

**Remember:** When in federal context, apply FedRAMP, FISMA, and NIST 800 security controls. Evidence required; no certification claims.

