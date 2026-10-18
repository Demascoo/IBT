# Addis Eats — Client Data

## Why a library?
Server components handle reading. Client fetching handles polling and typing. SWR provides caching, deduplication, and race-safety out of the box.

## The queries

### 1. Live Order Status
- **Where:** `app/orders/[id]/OrderStatus.jsx`
- **Key:** `"/api/orders/${id}"`
- **Options:** 
  - `fallbackData: initial` (Server renders first paint, no spinner).
  - `refreshInterval: 5000` (Polls every 5s because status changes).
  - `revalidateOnFocus: true` (Refreshes if user tabs away and back).

### 2. Menu Search
- **Where:** `app/menu/SearchBox.jsx`
- **Key:** `term ? "/api/dishes/search?q=..." : null`
- **Options:**
  - `keepPreviousData: true` (Stops list flashing empty between keystrokes).
  - `useDebounce` 300ms (Prevents a request per keystroke).
  - Null key when empty (Does not search for empty string).