const evidenceCopy = {
  change: "A reviewer starts with the proposed permission change, not a generic AI summary.",
  check: "The deterministic engine evaluates the same sensitive request before and after the change.",
  finding: "The result names the statement and access path that changed the decision.",
  decision: "A person approves, stops or corrects the change. The AI explanation never owns the verdict.",
};

function initEvidenceStory() {
  const story = document.querySelector("[data-evidence-story]");
  const caption = story?.querySelector("[data-evidence-caption]");
  const buttons = [...(story?.querySelectorAll("[data-stage-button]") ?? [])];
  if (!story || !caption || !buttons.length) return;

  let timer;
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const stage = button.dataset.stageButton;
      if (!stage || !evidenceCopy[stage] || story.dataset.stage === stage) return;

      story.dataset.stage = stage;
      caption.textContent = evidenceCopy[stage];
      story.classList.add("is-switching");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => story.classList.remove("is-switching"), 320);

      for (const other of buttons) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      }
    });
  }
}

function initCatalogue() {
  const controls = document.querySelector("[data-catalogue-controls]");
  const grid = document.querySelector("[data-catalogue-grid]");
  if (!controls || !grid) return;

  const cards = [...grid.querySelectorAll(".work-card")];
  const search = controls.querySelector("[data-catalogue-search]");
  const filters = [...controls.querySelectorAll("[data-work-filter]")];
  const count = document.querySelector("[data-catalogue-count]");
  const empty = document.querySelector("[data-catalogue-empty]");
  let category = "all";

  controls.hidden = false;

  function applyFilters() {
    const query = (search?.value ?? "").trim().toLowerCase();
    let visible = 0;

    for (const card of cards) {
      const categories = (card.dataset.category ?? "").split(" ");
      const matchesCategory = category === "all" || categories.includes(category);
      const searchText = [
        card.textContent,
        card.dataset.problem,
        card.dataset.solves,
        card.dataset.proof,
        card.dataset.category,
      ].filter(Boolean).join(" ").toLowerCase();
      const matchesQuery = !query || searchText.includes(query);
      const show = matchesCategory && matchesQuery;
      card.hidden = !show;
      if (show) visible += 1;
    }

    if (count) count.textContent = `${visible} of ${cards.length} projects`;
    if (empty) empty.hidden = visible !== 0;
  }

  search?.addEventListener("input", applyFilters);
  for (const button of filters) {
    button.addEventListener("click", () => {
      category = button.dataset.workFilter ?? "all";
      for (const other of filters) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      }
      applyFilters();
    });
  }

  applyFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  initEvidenceStory();
  initCatalogue();
});
