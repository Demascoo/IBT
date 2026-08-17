const list = document.querySelector("#list");
const loading = document.querySelector("#loading");
const refresh = document.querySelector("#refresh");

async function load() {
  loading.textContent = "Loading...";
  list.innerHTML = "";

  try {
    const res = await fetch("https://dummyjson.com/recipes");

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const data = await res.json();

    data.recipes.forEach(function (dish) {
      const li = document.createElement("li");

      li.textContent = dish.name;

      list.append(li);
    });
  } catch (error) {
    list.textContent = "Could not load dishes.";
  } finally {
    loading.textContent = "";
  }
}

refresh.addEventListener("click", load);

load();
