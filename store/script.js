const evidenceCopy = {
  change: "A reviewer starts with the proposed permission change, not a generic AI summary.",
  check: "The deterministic engine evaluates the same sensitive request before and after the change.",
  finding: "The result names the policy statement and access path that changed the decision.",
  decision: "A person approves, stops or corrects the change. The AI explanation never owns the verdict.",
};

const contractScenarios = {
  policy: {
    summary: "In the local change-review extension, code checks access before and after a change. AI explains the result; the reviewer owns the decision.",
    source: "Policy before and after the proposed change",
    authority: "Whether one sensitive action is allowed",
    ai: "Explain the result and point to the permission behind it",
    stop: "Do not show an explanation that disagrees with the checked result or its sources",
    owner: "Cloud security reviewer",
    record: "The permission change, check results and reviewer’s decision",
    example: "The screenshot shows my local change-review extension. The public repository offers the earlier organisation-policy demo and benchmark.",
    input: ["Inspect the public benchmark", "https://github.com/MatthewPaver/iam-policy-auditor/tree/main/benchmark"],
    output: ["See the local review example", "./preview.html?app=policylens#case-story"],
  },
  project: {
    summary: "The project timetable supplies the dates. Earlier decisions can help the review, but the board decides what to approve.",
    source: "A change request and its project timetable",
    authority: "Dates, deadlines and task relationships that disagree",
    ai: "Find earlier decisions for a reviewer to use or reject",
    stop: "Do not recommend a next step when dates or sources are missing",
    owner: "Project change board",
    record: "The differences, their source dates and the board’s response",
    example: "Northstar is a synthetic input pack. The public demo finds three blockers, including the 73-day finish movement; it does not establish the cause.",
    input: ["Inspect the Northstar input files", "https://github.com/MatthewPaver/ProjectLens/tree/main/docs/demo"],
    output: ["See the three-blocker result", "./preview.html?app=projectlens#case-story"],
  },
  data: {
    summary: "The public template rebuilds campaign tables. My local follow-on work tests tomorrow’s prediction against simply using today’s figure.",
    source: "Campaign records and the dates they became available",
    authority: "Missing, repeated or late records, and accidental use of future data",
    ai: "Estimate tomorrow’s bookings and compare with a simple forecast",
    stop: "Review quality warnings and any failure to beat the simple baseline before using predictions",
    owner: "Marketing operations lead",
    record: "The input version, data checks, both forecasts and chosen action",
    example: "The public console is a fixed quality snapshot. Next-day evaluation is a local extension, not the model in the published walkthrough.",
    input: ["Read the published rebuild steps", "https://github.com/MatthewPaver/marketing-ml-lakehouse/blob/main/DEMO.md"],
    output: ["Inspect the sample and its boundary", "./preview.html?app=lakehouse#case-story"],
  },
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function initScreeningRoom() {
  const room = document.querySelector("[data-screening-room]");
  if (!room) return;
  const tabs = [...room.querySelectorAll("[data-screening-tab]")];
  const panels = [...room.querySelectorAll("[data-screening-panel]")];
  const video = room.querySelector("video");
  const play = room.querySelector("[data-play-video]");
  const error = room.querySelector(".screening-error");
  room.querySelector(".screening-tabs").hidden = false;
  if (video && play) {
    const label = play.querySelector("span");
    const showError = () => {
      error.hidden = false;
      play.disabled = false;
      label.textContent = "Try the recording again";
    };
    video.controls = false;
    play.hidden = false;
    play.addEventListener("click", async () => {
      play.disabled = true;
      label.textContent = "Loading recording…";
      error.hidden = true;
      video.controls = true;
      video.dataset.started = "true";
      try {
        await video.play();
        play.hidden = true;
        video.focus();
      } catch {
        showError();
      } finally {
        play.disabled = false;
      }
    });
    video.addEventListener("error", showError);
    video.querySelector("source")?.addEventListener("error", showError);
    video.addEventListener("ended", () => { play.hidden = false; label.textContent = "Watch again"; });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      if (tab.getAttribute("aria-pressed") === "true") return;
      video?.pause();
      error.hidden = true;
      for (const other of tabs) other.setAttribute("aria-pressed", String(other === tab));
      for (const panel of panels) {
        panel.hidden = panel.dataset.screeningPanel !== tab.dataset.screeningTab;
        if (!panel.hidden && !reducedMotion.matches) {
          panel.animate([{ opacity: .65, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 360, easing: "cubic-bezier(.16,1,.3,1)" });
        }
      }
    });
    tab.addEventListener("keydown", (event) => {
      const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });
  // Pause a recording when it leaves the reading area; never resume it automatically.
  if (video && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) video.pause(); }).observe(video);
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden) video?.pause(); });
}

function initLandingMotion() {
  const hero = document.querySelector(".landing-hero");
  const toggle = document.querySelector("[data-motion-toggle]");
  if (!hero || !toggle) return;
  let paused = false;
  let visible = true;
  const update = () => {
    hero.dataset.backgroundRunning = String(!paused && visible && !document.hidden && !reducedMotion.matches);
    toggle.hidden = reducedMotion.matches;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.textContent = paused ? "Resume background motion" : "Pause background motion";
    if (reducedMotion.matches) document.getAnimations().forEach((animation) => animation.cancel());
  };
  toggle.addEventListener("click", () => { paused = !paused; update(); });
  reducedMotion.addEventListener("change", update);
  document.addEventListener("visibilitychange", update);
  update();
  if (!("IntersectionObserver" in window)) return;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }).observe(hero);
  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      reveal.unobserve(entry.target);
      if (reducedMotion.matches) continue;
      const isMedia = entry.target.classList.contains("project-media");
      entry.target.animate(isMedia ? [
        { clipPath: "inset(6% 0 0 0 round 14px)", transform: "translateY(18px)" },
        { clipPath: "inset(0 0 0 0 round 14px)", transform: "translateY(0)" },
      ] : [
        { opacity: .65, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: isMedia ? 850 : 600, easing: "cubic-bezier(.16,1,.3,1)" });
    }
  }, { threshold: .12 });
  document.querySelectorAll("[data-reveal], .selected-card .project-media, .capability-routes a").forEach((element) => reveal.observe(element));
}

function initEvidenceStory() {
  const story = document.querySelector("[data-evidence-story]");
  const caption = story?.querySelector("[data-evidence-caption]");
  const buttons = [...(story?.querySelectorAll("[data-stage-button]") ?? [])];
  if (!story || !caption || !buttons.length) return;

  let switchTimer;

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
    button.addEventListener("click", () => selectStage(button.dataset.stageButton));
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
    workbench.querySelector('[data-contract-example]').textContent = scenario.example;
    for (const direction of ['input', 'output']) {
      const link = workbench.querySelector(`[data-contract-${direction}]`);
      [link.textContent, link.href] = scenario[direction];
    }
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

document.addEventListener("DOMContentLoaded", () => {
  initScreeningRoom();
  initLandingMotion();
  initEvidenceStory();
  initDecisionContract();
  initSectionNavigation();
});
