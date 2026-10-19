# Addis Eats — Rendering Strategy

| Route | Strategy | Marker | One-line reason |
| --- | --- | --- | --- |
| `/` | Static | ○ | Landing page. Nothing varies per visitor or freshness. |
| `/menu` | ISR — `revalidate = 3600` | ○ | Menu changes slowly; speed matters most; 1h stale is fine. |
| `/menu/[id]` | Static via `generateStaticParams` | ● | All dish ids are known at build → prebuild one HTML each. |
| `/cart` | Client | ○ | Empty-cart demo; real state lives in the client store. |
| `/checkout` | Dynamic | ƒ | Form submission + server action; validated per request. |
| `/orders` | Dynamic | ƒ | Reads the session; refreshed by `revalidatePath("/orders")`. |
| `/api/dishes` | Dynamic | ƒ | Reads the `?category=` query string. |
| `/api/dishes/[id]` | Dynamic | ƒ | Reads the dynamic segment `[id]`. |
| `/api/orders` | Dynamic | ƒ | `POST` never cached; `GET` reads live mock store. |

## Legend
- ○ — Static: prerendered HTML at build time
- ● — Static with `generateStaticParams`: one page per known param
- ƒ — Dynamic: rendered on every request

## Six Failure Checks
1. **Throttle to Slow 3G:** `loading.js` skeleton shows; header/sidebar already visible.
2. **Throw inside menu page:** `error.js` renders with reset button; header survives.
3. **Visit `/menu/not-a-dish`:** 404 page, not a crash.
4. **Post invalid phone to `/api/orders`:** 422 with `fieldErrors.phone`.
5. **Disable JavaScript, submit checkout:** Server action still places the order.
6. **Search the client bundle for secrets:** Nothing sensitive is there.