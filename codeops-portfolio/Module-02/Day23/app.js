// ---------- State: the single source of truth ----------
const state = {
  dishes: [],
  cart: [],
  search: "",
};

const menuEl = document.querySelector("#menu");
const cartEl = document.querySelector("#cart");
const searchEl = document.querySelector("#search");

async function loadMenu() {
  menuEl.innerHTML = `<p class="status-message">Loading menu…</p>`;
  try {
    const res = await fetch("data/menu.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    state.dishes = await res.json();
    render();
  } catch (err) {
    menuEl.innerHTML = `<p class="status-message">Could not load the menu. Please refresh.</p>`;
    console.error(err);
  }
}

function render() {
  const term = state.search.trim().toLowerCase();
  const shown = state.dishes.filter(
    (d) =>
      d.name.toLowerCase().includes(term) ||
      d.category.toLowerCase().includes(term),
  );

  if (state.dishes.length === 0) {
  } else if (shown.length === 0) {
    menuEl.innerHTML = `<p class="status-message">No dishes found for "${escapeHtml(state.search)}".</p>`;
  } else {
    menuEl.innerHTML = shown
      .map(
        (d) => `
      <article class="dish" data-id="${d.id}">
        <div class="dish-top">
          <h3>${escapeHtml(d.name)}</h3>
          <span class="category">${escapeHtml(d.category)}</span>
        </div>
        <p class="desc">${escapeHtml(d.desc || "")}</p>
        ${d.spicy ? `<span class="spicy">🌶 Spicy</span>` : ``}
        <div class="dish-bottom">
          <span class="price">${d.price} ETB</span>
          <button class="add" type="button">Add</button>
        </div>
      </article>
    `,
      )
      .join("");
  }

  renderCart();
}

function renderCart() {
  if (state.cart.length === 0) {
    cartEl.innerHTML = `
      <h2>Your order</h2>
      <p class="cart-empty">Your cart is empty — add a dish to get started.</p>
    `;
    return;
  }

  const lines = state.cart
    .map(
      (i) => `
    <li data-id="${i.id}">
      <span>
        <span class="line-name">${escapeHtml(i.name)}</span>
        <span class="line-meta"> × ${i.qty} — ${i.price * i.qty} ETB</span>
      </span>
      <button class="rm" type="button">Remove</button>
    </li>
  `,
    )
    .join("");

  cartEl.innerHTML = `
    <h2>Your order</h2>
    <ul>${lines}</ul>
    <div class="cart-total">
      <span>Total</span>
      <span>${cartTotal()} ETB</span>
    </div>
  `;
}

function cartTotal() {
  return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function save() {
  localStorage.setItem("addiseats-cart", JSON.stringify(state.cart));
}

function load() {
  const saved = localStorage.getItem("addiseats-cart");
  if (saved) {
    try {
      state.cart = JSON.parse(saved);
    } catch {
      state.cart = [];
    }
  }
}

searchEl.addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

menuEl.addEventListener("click", (e) => {
  if (!e.target.matches(".add")) return;
  const id = Number(e.target.closest(".dish").dataset.id);
  const dish = state.dishes.find((d) => d.id === id);
  const line = state.cart.find((i) => i.id === id);
  if (line) line.qty++;
  else
    state.cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      qty: 1,
    });
  save();
  render();
});

cartEl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const id = Number(e.target.closest("li").dataset.id);
  state.cart = state.cart.filter((i) => i.id !== id);
  save();
  render();
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function init() {
  load();
  await loadMenu();
}

init();
