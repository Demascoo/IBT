let items = [];
const form = document.getElementById("form");
const input = document.getElementById("itemInput");
const count = document.getElementById("count");
const list = document.getElementById("list");
function render() {
  list.innerHTML = "";
  for (let item of items) {
    let li = document.createElement("li");
    li.dataset.id = item.id;
    li.textContent = item.name;
    if (item.done) {
      li.classList.add("done");
    }
    let button = document.createElement("button");
    button.textContent = "Remove";
    button.className = "del";
    li.appendChild(button);
    list.appendChild(li);
  }
  let remaining = 0;
  for (let item of items) {
    if (!item.done) {
      remaining++;
    }
  }
  count.textContent = remaining;
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
    items = items.filter(function (item) {
      return item.id !== id;
    });
  } else {
    for (let item of items) {
      if (item.id === id) {
        item.done = !item.done;
      }
    }
  }
  render();
});
render();
