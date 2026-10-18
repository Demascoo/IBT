# Authentication & Security

## The Three Layers
1. **Middleware** (`middleware.js`): Checks if a session cookie exists before rendering `/orders` or `/checkout`. Redirects if missing.
2. **Page** (`app/orders/page.js`): Uses `listOrders()` which checks the session to ensure it only returns *this* user's orders.
3. **Action** (`app/actions.js`): `cancelOrder` and `placeOrder` check the session inside the action. If someone tries to call the action manually without a cookie, it throws an error.

## Ownership Check
In `cancelOrder`, we check `if (order.userId !== user.id) throw new Error("Not yours")`. Even if you are signed in, you cannot cancel someone else's order.

## Open Redirect Prevention
In `app/signin/page.js`, we check `if (!next.startsWith("/")) next = "/";` before redirecting. This prevents attackers from crafting a link that sends users to an external site after signing in.