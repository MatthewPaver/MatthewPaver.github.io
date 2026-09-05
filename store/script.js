const evidenceCopy = {
  change: "A reviewer starts with the proposed permission change, not a generic AI summary.",
  check: "The deterministic engine evaluates the same sensitive request before and after the change.",
  finding: "The result names the policy statement and access path that changed the decision.",
  decision: "A person approves, stops or corrects the change. The AI explanation never owns the verdict.",
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
  initSectionNavigation();
});
