export function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function parseState(search = "") {
  const params = new URLSearchParams(search);
  return {
    query: normalize(params.get("q")),
    facets: new Set(params.getAll("facet").map(normalize).filter(Boolean)),
    stack: normalize(params.get("stack")),
    sort: params.get("sort") === "updated" ? "updated" : "curated",
  };
}

export function stateToSearch(state) {
  const params = new URLSearchParams();
  if (state.query) params.set("q", state.query);
  [...state.facets].sort().forEach((facet) => params.append("facet", facet));
  if (state.stack) params.set("stack", state.stack);
  if (state.sort === "updated") params.set("sort", "updated");
  const value = params.toString();
  return value ? `?${value}` : "";
}

export function itemMatches(item, state) {
  const search = normalize(item.search);
  const queryTokens = normalize(state.query).split(" ").filter(Boolean);
  const queryMatches = queryTokens.every((token) => search.includes(token));
  const facetMatches =
    state.facets.size === 0 ||
    [...state.facets].some(
      (facet) => item.kind === facet || item.status === facet || (facet === "source" && item.source === "true"),
    );
  const stackMatches = !state.stack || item.stack.split("|").includes(state.stack);
  return queryMatches && facetMatches && stackMatches;
}

export function initCatalogue() {
  const catalogue = document.querySelector("[data-catalogue]");
  if (!catalogue) return;
  const cards = [...catalogue.querySelectorAll("[data-catalogue-item]")];
  const search = document.querySelector("#catalogue-search");
  const stack = document.querySelector("#stack-filter");
  const sort = document.querySelector("#sort-products");
  const facetButtons = [...document.querySelectorAll("[data-facet]")];
  const count = document.querySelector("#result-count");
  const empty = document.querySelector("#catalogue-empty");
  let state = parseState(location.search);

  const readItem = (card) => ({
    search: card.dataset.search,
    kind: card.dataset.kind,
    status: card.dataset.status,
    source: card.dataset.source,
    stack: card.dataset.stack,
  });

  function syncControls() {
    if (search) search.value = state.query;
    if (stack) stack.value = state.stack;
    if (sort) sort.value = state.sort;
    facetButtons.forEach((button) => {
      const facet = button.dataset.facet;
      const selected = facet ? state.facets.has(facet) : state.facets.size === 0;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-active", selected);
    });
  }

  function render(push = false) {
    const visible = cards.filter((card) => itemMatches(readItem(card), state));
    cards.forEach((card) => {
      card.hidden = !visible.includes(card);
    });
    if (state.sort === "updated") {
      visible
        .sort((a, b) => Date.parse(b.dataset.updated ?? 0) - Date.parse(a.dataset.updated ?? 0))
        .forEach((card) => catalogue.append(card));
    }
    if (count) count.textContent = `${visible.length} ${visible.length === 1 ? "result" : "results"}`;
    if (empty) empty.hidden = visible.length !== 0;
    syncControls();
    const nextUrl = `${location.pathname}${stateToSearch(state)}${location.hash}`;
    history[push ? "pushState" : "replaceState"]({}, "", nextUrl);
  }

  search?.addEventListener("input", () => {
    state.query = normalize(search.value);
    render(true);
  });
  stack?.addEventListener("change", () => {
    state.stack = normalize(stack.value);
    render(true);
  });
  sort?.addEventListener("change", () => {
    state.sort = sort.value === "updated" ? "updated" : "curated";
    render(true);
  });
  facetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const facet = button.dataset.facet;
      state.facets = facet ? new Set([facet]) : new Set();
      render(true);
    });
  });
  document.querySelector("#clear-filters")?.addEventListener("click", () => {
    state = { query: "", facets: new Set(), stack: "", sort: "curated" };
    render(true);
  });
  addEventListener("popstate", () => {
    state = parseState(location.search);
    render(false);
  });
  render(false);
}

export function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy ?? "";
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          copied = true;
        }
      } catch {}
      if (!copied) {
        window.prompt("Copy this command:", value);
      }
      const original = button.textContent;
      button.textContent = copied ? "Copied" : "Select and copy";
      setTimeout(() => {
        button.textContent = original;
      }, 1800);
    });
  });
}
