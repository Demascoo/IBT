const MENU_URL = "data/menu.json";
const STORAGE_KEY = "addiseats-cart";
const PHONE = /^(?:\+251|0)9\d{8}$/; 
const state = {
  dishes: [], 
  cart: [],
  search: "", 
  loading: true, 
  error: null, 
};

const menuEl = document.querySelector("#menu");
const cartContentEl = document.querySelector("#cart-content");
const searchEl = document.querySelector("#search");
const checkoutForm = document.querySelector("#checkout");
const nameEl = document.querySelector("#name");
const phoneEl = document.querySelector("#phone");
const areaEl = document.querySelector("#area");
const errEl = document.querySelector("#form-error");
const confirmationEl = document.querySelector("#confirmation");

async function loadMenu() {
  state.loading = true;
  state.error = null;
  renderMenu();
  try {
    const res = await fetch(MENU_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    state.dishes = await res.json();
  } catch (err) {
    state.error =
      "Could not load the menu Check your connection and try again.";
    console.error(err);
  } finally {
    state.loading = false;
    render();
  }
}

function render() {
  renderMenu();
  renderCart();
}

function renderMenu() {
  if (state.loading) {
    menuEl.innerHTML = `<p class="status-message">Loading menu…</p>`;
    return;
  }

  if (state.error) {
    menuEl.innerHTML = `
      <p class="status-message error">${escapeHtml(state.error)}</p>
      <button id="retry" type="button" class="add">Retry</button>
    `;
    return;
  }

  const term = state.search.trim().toLowerCase();
  const shown = state.dishes.filter(
    (d) =>
      d.name.toLowerCase().includes(term) ||
      d.category.toLowerCase().includes(term),
  );

  if (shown.length === 0) {
    menuEl.innerHTML = `<p class="status-message">No dishes found for "${escapeHtml(state.search)}".</p>`;
    return;
  }

  menuEl.innerHTML = shown.map(renderDishCard).join("");
}

function renderDishCard(d) {
  return `
    <article class="dish" data-id="${d.id}">
      ${d.image ? `<img class="dish-img" src="${escapeHtml(d.image)}" alt="${escapeHtml(d.name)}" loading="lazy" />` : ``}
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
  `;
}

function renderCart() {
  if (state.cart.length === 0) {
    cartContentEl.innerHTML = `
      <h2>Your order</h2>
      <p class="cart-empty">Your cart is empty — add a dish to get started.</p>
    `;
    return;
  }

  cartContentEl.innerHTML = `
    <h2>Your order</h2>
    ${renderCartLines()}
    ${renderCartTotal()}
  `;
}

function renderCartLines() {
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
  return `<ul>${lines}</ul>`;
}

function renderCartTotal() {
  return `
    <div class="cart-total">
      <span>Total</span>
      <span>${cartTotal()} ETB</span>
    </div>
  `;
}

function cartTotal() {
  return state.cart.reduce((sum, i) => sum + (i.price ?? 0) * (i.qty ?? 0), 0);
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    state.cart = JSON.parse(saved);
  } catch (err) {
    console.error("Could not read saved cart", err);
    state.cart = [];
  }
}

function validate({ name, phone }) {
  if (!name.trim()) return "Please enter your name.";
  if (!PHONE.test(phone))
    return "Enter a valid Ethiopian phone (09xxxxxxxx or +2519xxxxxxxx).";
  if (state.cart.length === 0) return "Your cart is empty.";
  return "";
}

function placeOrder(data) {
  const order = {
    ...data,
    items: state.cart,
    total: cartTotal(), 
    placedAt: new Date().toISOString(),
  };
  console.log("Order placed:", order);
  state.cart = []; 
  save();
  render();
  showConfirmation(order);
}

function showConfirmation(order) {
  confirmationEl.hidden = false;
  confirmationEl.textContent = `Order placed — ${order.total} ETB, delivering to ${order.area}.`;
  checkoutForm.reset();
}

searchEl.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderMenu();
});

menuEl.addEventListener("click", (e) => {
  if (e.target.matches("#retry")) {
    loadMenu();
    return;
  }
  if (!e.target.matches(".add")) return;
  const id = Number(e.target.closest(".dish").dataset.id);
  const dish = state.dishes.find((d) => d.id === id);
  if (!dish) return; // guard: dish not found
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

cartContentEl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const id = Number(e.target.closest("li").dataset.id);
  state.cart = state.cart.filter((i) => i.id !== id);
  save();
  render();
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  confirmationEl.hidden = true;
  const data = {
    name: nameEl.value,
    phone: phoneEl.value,
    area: areaEl.value,
  };
  const msg = validate(data);
  errEl.textContent = msg;
  if (msg) return; 
  placeOrder(data);
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
