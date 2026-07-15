const buttons = [...document.querySelectorAll("[data-filter]")];
const products = [...document.querySelectorAll("[data-kind]")];
const validFilters = new Set(buttons.map((button) => button.dataset.filter));

function applyFilter(filter, updateUrl = true) {
  const selectedFilter = validFilters.has(filter) ? filter : "all";

  buttons.forEach((button) => {
    const selected = button.dataset.filter === selectedFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  products.forEach((product) => {
    const matches = selectedFilter === "all" || product.dataset.kind.split(" ").includes(selectedFilter);
    product.classList.toggle("hidden", !matches);
  });

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (selectedFilter === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", selectedFilter);
    window.history.replaceState({}, "", url);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

applyFilter(new URLSearchParams(window.location.search).get("filter") || "all", false);
document.querySelector("#year").textContent = new Date().getFullYear();
