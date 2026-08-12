let items = [];

const form = document.getElementById("add-form");
const input = document.getElementById("name");
const list = document.getElementById("list");
const count = document.getElementById("count");

function render() {
  list.innerHTML = "";

  for (let item of items) {
    let li = document.createElement("li");
    li.dataset.id = item.id;

    if (item.done) {
      li.classList.add("done");
    }

    let name = document.createElement("span");
    name.textContent = item.name;

    let button = document.createElement("button");
    button.textContent = "Remove";
    button.classList.add("del");

    li.appendChild(name);
    li.appendChild(button);

    list.appendChild(li);
  }

  let remaining = items.filter((item) => !item.done).length;
  count.textContent = remaining + " items";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let name = input.value.trim();

  if (name === "") {
    return;
  }

  items.push({
    id: Date.now(),
    name: name,
    done: false,
  });

  input.value = "";

  render();
});

list.addEventListener("click", function (event) {
  let li = event.target.closest("li");

  if (!li) {
    return;
  }

  let id = Number(li.dataset.id);

  if (event.target.classList.contains("del")) {
    items = items.filter((item) => item.id !== id);
  } else {
    let item = items.find((item) => item.id === id);

    if (item) {
      item.done = !item.done;
    }
  }

  render();
});

render();
