# Coding Principles — RestaurantOS

> Detailed coding principles. Summary in `CONSTITUTION.md` Article II.

---

## 1. TypeScript Strict

```json
// tsconfig.json — every package
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

- No `any`. Use `unknown` + narrowing if type is truly unknown.
- No `// @ts-ignore` without ADR.
- Explicit return types on exported functions.
- `readonly` for immutable fields.

## 2. Clean Code

- Functions: ≤ 20 lines, one responsibility, verb-named (`createOrder`, `validatePrice`).
- Classes: ≤ 200 lines, one responsibility.
- No duplicated logic — extract to shared function/util.
- No dead code — delete, don't comment out.
- Meaningful names — `productPrice` not `pp`, `isAvailable` not `flag`.

## 3. Error Handling

- Throw typed domain exceptions (`ProductNotFoundError`, `DuplicateProductError`).
- Global `ExceptionFilter` maps to HTTP responses.
- Never swallow exceptions. Never return `null` where error should be thrown.
- Frontend: every API call has `onError` with user-facing message.

## 4. Logging

- Structured logger (`Logger` from `@nestjs/common` or `pino`).
- No `console.log` in committed code.
- Never log secrets, PII, or full request bodies with sensitive fields.
- Log levels: `error` (failures), `warn` (degraded), `log` (info), `debug` (verbose).

## 5. Comments

- Code should be self-documenting. Comments explain WHY, not WHAT.
- No commented-out code.
- JSDoc for public APIs and complex domain logic.
