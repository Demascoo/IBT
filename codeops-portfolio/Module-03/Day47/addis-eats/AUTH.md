# Authentication & Security

- **Middleware:** `proxy.js` protects `/checkout` and `/orders`.
- **Sessions:** Stored in `httpOnly`, `secure` cookies.
- **Ownership Check:** In `app/actions.js`, `cancelOrder` checks `if (order.userId !== user.id)`.

## The Three Attacks (Verified on Live URL)
1. **Signed out:** Blocked by `proxy.js`.
2. **Someone else's order:** Blocked by `notFound()` if the ID doesn't match.
3. **Open redirect:** Blocked in `signin/page.js` because it requires the redirect to start with `/`.