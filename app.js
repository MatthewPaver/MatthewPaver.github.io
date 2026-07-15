const buttons = [...document.querySelectorAll("[data-filter]")];
const products = [...document.querySelectorAll("[data-kind]")];
const status = document.querySelector("#filter-status");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    buttons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    products.forEach((product) => {
      const matches = filter === "all" || product.dataset.kind.split(" ").includes(filter);
      product.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    const label = filter === "all" ? "all" : filter;
    status.textContent = `Showing ${visibleCount} ${label} product${visibleCount === 1 ? "" : "s"}`;
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
