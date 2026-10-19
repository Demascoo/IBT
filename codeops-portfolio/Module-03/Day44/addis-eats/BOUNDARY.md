# Addis Eats — Server / Client Boundary

## The two kinds of component
- **Server Component:** Default. Runs on server only. Ships zero JS. Can use `await` and DB.
- **Client Component:** Marked with `"use client"`. Runs on server (SSR) then browser (Hydration). Can use `useState`, `onClick`, etc.

## Where each component runs

| Component | Side | Why |
| --- | --- | --- |
| `app/layout.js` | **Server** | Root shell; passes `children` into `<Providers>` |
| `app/providers.jsx` | **Client** | Cart context requires `useState` |
| `app/page.js` | Server | Static markup |
| `app/cart/page.js` | **Client** | Reads `useCart()` and has clear button |
| `app/checkout/page.js` | **Client** | Form with `useActionState` for pending flag |
| `app/orders/page.js` | Server | Async; reads orders for current session |
| `app/orders/[id]/page.js` | Server | Async; reads order by ID |
| `app/orders/[id]/OrderStatus.jsx` | **Client** | SWR polling hook (`useSWR`) |
| `app/menu/layout.js` | Server | Static sidebar; reads `db.dish.findMany()` |
| `app/menu/page.js` | Server | Async — awaits `db.dish.findMany()` |
| `app/menu/DishList.jsx` | Server | Pure markup from props |
| `app/menu/FilterShell.jsx` | **Client** | Search input state; wraps server children |
| `app/menu/SearchBox.jsx` | **Client** | SWR + Debounce hook |
| `app/menu/AddToCartButton.jsx` | **Client** | `onClick` writes to cart store |
| `app/menu/[id]/page.js` | Server | Async — reads params, renders dish |
| `app/api/dishes/route.js` | Server (route) | HTTP handler, never a component |
| `app/api/dishes/[id]/route.js` | Server (route) | HTTP handler |
| `app/api/orders/route.js` | Server (route) | HTTP handler |
| `app/actions.js` | Server (action) | Marked `"use server"` |

**Total Client Components: 7** (all leaves — none at the root level of `app/`).

## Composition across the boundary

Where a client component wraps server content, it does so via **`children`**, not import:
```jsx
<Providers>{children}</Providers>
<FilterShell><Dishes /></FilterShell>