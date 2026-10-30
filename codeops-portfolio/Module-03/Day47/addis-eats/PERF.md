# Performance Report

## Lighthouse (Mobile)
- **Performance:** 87 
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 58 → 100 (Fixed by disabling Vercel Authentication)

## Core Web Vitals
- **LCP:** 2.6s 
- **CLS:** 0
- **INP:** Under 200ms

## What was fixed
- All images use `next/image` with explicit `sizes`.
- Used `next/font` to self-host Inter, eliminating layout shift.