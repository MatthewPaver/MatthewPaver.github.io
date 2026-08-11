const evidenceCopy = {
  change: "A reviewer starts with the proposed permission change, not a generic AI summary.",
  check: "The deterministic engine evaluates the same sensitive request before and after the change.",
  finding: "The result names the policy statement and access path that changed the decision.",
  decision: "A person approves, stops or corrects the change. The AI explanation never owns the verdict.",
};

const contractScenarios = {
  policy: {
    summary: "A cloud access review where code owns the verdict and AI is limited to a cited explanation.",
    source: "Policy before and after the proposed change",
    authority: "Permission evaluation for one sensitive request",
    ai: "Explain the fixed verdict with claims tied to policy evidence",
    stop: "Withhold the explanation when verdict, claims or citations disagree",
    owner: "Cloud security reviewer",
    record: "Policy diff, granting statement, checks and reviewer decision",
  },
  project: {
    summary: "A change review where schedule dates remain authoritative and precedent can only inform the board.",
    source: "Change narrative and its Primavera schedule",
    authority: "Date, milestone and logic conflict checks",
    ai: "Retrieve cited precedent for explicit use or rejection",
    stop: "Withhold a recommendation when source dates or citations are missing",
    owner: "Project change board",
    record: "Claims, source dates, conflicts, precedent use and board response",
  },
  data: {
    summary: "A next-day campaign task where contracts and temporal evaluation come before a model score.",
    source: "Campaign events, contracts and arrival timestamps",
    authority: "Schema, lineage, freshness, duplicate and leakage checks",
    ai: "Estimate next-day bookings and under-pacing against a baseline",
    stop: "Withhold the watchlist when data quality or baseline checks fail",
    owner: "Marketing operations lead",
    record: "Source checksum, quality results, forecast, baseline and action",
  },
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function initEvidenceStory() {
  const story = document.querySelector("[data-evidence-story]");
  const caption = story?.querySelector("[data-evidence-caption]");
  const buttons = [...(story?.querySelectorAll("[data-stage-button]") ?? [])];
  if (!story || !caption || !buttons.length) return;

  let switchTimer;
  let sequenceTimers = [];
  let sequenceStarted = false;

  function cancelSequence() {
    for (const timer of sequenceTimers) window.clearTimeout(timer);
    sequenceTimers = [];
  }

  function selectStage(stage) {
    if (!stage || !evidenceCopy[stage] || story.dataset.stage === stage) return;

    story.dataset.stage = stage;
    caption.textContent = evidenceCopy[stage];
    story.classList.add("is-switching");
    window.clearTimeout(switchTimer);
    switchTimer = window.setTimeout(() => story.classList.remove("is-switching"), 320);

    for (const button of buttons) {
      button.setAttribute("aria-pressed", button.dataset.stageButton === stage ? "true" : "false");
    }
  }

  for (const button of buttons) {
    button.addEventListener("click", () => {
      cancelSequence();
      selectStage(button.dataset.stageButton);
    });
  }

  function playSequenceOnce() {
    if (sequenceStarted || reducedMotion.matches) return;
    sequenceStarted = true;
    ["check", "finding", "decision"].forEach((stage, index) => {
      sequenceTimers.push(window.setTimeout(() => selectStage(stage), 900 + index * 1050));
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      playSequenceOnce();
    }, { threshold: 0.55 });
    observer.observe(story);
  } else {
    playSequenceOnce();
  }
}

function initDecisionContract() {
  const workbench = document.querySelector("[data-decision-contract]");
  const canvas = workbench?.querySelector("[data-contract-canvas]");
  const summary = workbench?.querySelector("[data-contract-summary]");
  const buttons = [...(workbench?.querySelectorAll("[data-contract-scenario]") ?? [])];
  if (!workbench || !canvas || !summary || !buttons.length) return;

  let animationTimer;
  let hasPlayed = false;
  let selectedKey = "policy";

  function playSignal() {
    if (reducedMotion.matches) return;
    canvas.classList.remove("is-playing");
    requestAnimationFrame(() => {
      canvas.classList.add("is-playing");
      window.clearTimeout(animationTimer);
      animationTimer = window.setTimeout(() => canvas.classList.remove("is-playing"), 1250);
    });
  }

  function selectScenario(key) {
    const scenario = contractScenarios[key];
    if (!scenario || key === selectedKey) return;

    selectedKey = key;
    summary.textContent = scenario.summary;
    for (const field of ["source", "authority", "ai", "stop", "owner", "record"]) {
      const target = canvas.querySelector(`[data-contract-value="${field}"]`);
      if (target) target.textContent = scenario[field];
    }
    for (const button of buttons) {
      button.setAttribute("aria-pressed", button.dataset.contractScenario === key ? "true" : "false");
    }
    playSignal();
  }

  for (const button of buttons) {
    button.addEventListener("click", () => selectScenario(button.dataset.contractScenario));
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasPlayed) return;
      hasPlayed = true;
      observer.disconnect();
      playSignal();
    }, { threshold: 0.35 });
    observer.observe(workbench);
  }
}

function initSectionNavigation() {
  const links = [...document.querySelectorAll("[data-nav-section]")];
  if (!("IntersectionObserver" in window) || !links.length) return;

  const pairs = links
    .map((link) => ({ link, section: document.getElementById(link.dataset.navSection) }))
    .filter((pair) => pair.section);

  function setCurrent(id) {
    for (const pair of pairs) {
      if (pair.section.id === id) pair.link.setAttribute("aria-current", "location");
      else pair.link.removeAttribute("aria-current");
    }
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setCurrent(visible.target.id);
  }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.6] });

  for (const pair of pairs) observer.observe(pair.section);
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
  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  const validCategory = filters.some((button) => button.dataset.workFilter === requestedCategory);
  let category = validCategory ? requestedCategory : "all";

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
    button.setAttribute("aria-pressed", button.dataset.workFilter === category ? "true" : "false");
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
  initDecisionContract();
  initSectionNavigation();
  initCatalogue();
});
