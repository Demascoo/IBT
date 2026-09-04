export async function loadDishes(signal) {
  try {
    const response = await fetch("/dishes.json", { signal });

    if (!response.ok) {
      throw new Error(`Failed to load menu: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }
    throw new Error("Could not load the menu. Please try again.");
  }
}
