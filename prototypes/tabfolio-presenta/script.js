const root = document.documentElement;
root.classList.add('motion-ready');
requestAnimationFrame(() => root.classList.add('is-ready'));

const tabs = [...document.querySelectorAll('[role="tab"][data-project]')];
const panels = [...document.querySelectorAll('[role="tabpanel"][data-panel]')];

function selectProject(nextTab) {
  tabs.forEach((tab) => {
    const selected = tab === nextTab;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  panels.forEach((panel) => {
    const selected = panel.dataset.panel === nextTab.dataset.project;
    panel.hidden = !selected;
    panel.classList.toggle('is-active', selected);

    if (selected) {
      panel.classList.remove('is-entering');
      requestAnimationFrame(() => panel.classList.add('is-entering'));
    }
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProject(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    tabs[nextIndex].focus();
    selectProject(tabs[nextIndex]);
  });
});

const assuranceMap = document.querySelector('[data-assurance-map]');
const flowButtons = [...document.querySelectorAll('[data-flow-scenario]')];
const flowSummary = document.querySelector('[data-flow-summary]');
const flowOwner = document.querySelector('[data-flow-owner]');
const flowRecord = document.querySelector('[data-flow-record]');
const flowMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let assuranceMapVisible = false;

const flowScenarios = {
  policy: {
    summary: 'Who gains access, why, and whether the correction closes it.',
    input: ['AWS access change', 'What changed and which sensitive request matters?'],
    controls: ['Permission analysis', 'Compare access before and after. Test the proposed fix.'],
    ai: ['Cited explanation', 'AI explains the result only when verdict, claims and citations agree.'],
    decision: ['Approve or return', 'The reviewer sees the evidence, the limit and the exact reason.'],
    owner: 'Cloud security reviewer',
    record: 'Policy diff, granting statement, checks and decision',
  },
  project: {
    summary: 'Whether a change narrative matches the schedule dates it relies on.',
    input: ['Change pack and XER schedule', 'What is being claimed and which dates support it?'],
    controls: ['Schedule conflict checks', 'Compare claimed dates with source dates, logic and milestones.'],
    ai: ['Cited precedent', 'Retrieve relevant past decisions, then require explicit use or rejection.'],
    decision: ['Record the board response', 'Approve, challenge or request more evidence before close-out.'],
    owner: 'Project change board',
    record: 'Source dates, conflicts, cited precedent and board response',
  },
  data: {
    summary: 'Which campaign needs attention tomorrow, and whether the underlying data can be trusted.',
    input: ['Campaign events and contracts', 'What arrived, when it arrived and which schema it follows.'],
    controls: ['Lineage and leakage checks', 'Validate freshness, transformations and the next-day evaluation split.'],
    ai: ['Risk watchlist', 'Estimate next-day bookings and under-pacing against a simple baseline.'],
    decision: ['Investigate tomorrow', 'The marketing lead chooses which campaign needs attention first.'],
    owner: 'Marketing operations lead',
    record: 'Source checksum, quality results, forecast, baseline and action',
  },
};

function syncAssuranceMotion() {
  if (!assuranceMap) return;
  const shouldRun = assuranceMapVisible && !flowMotionPreference.matches && !document.hidden;
  assuranceMap.classList.toggle('is-running', shouldRun);
}

function restartAssuranceMotion() {
  if (!assuranceMap) return;
  assuranceMap.classList.remove('is-running');
  requestAnimationFrame(syncAssuranceMotion);
}

function selectFlowScenario(button) {
  const scenario = flowScenarios[button.dataset.flowScenario];
  if (!scenario || !assuranceMap) return;

  flowButtons.forEach((candidate) => {
    const selected = candidate === button;
    candidate.classList.toggle('is-active', selected);
    candidate.setAttribute('aria-pressed', String(selected));
  });

  ['input', 'controls', 'ai', 'decision'].forEach((stage) => {
    assuranceMap.querySelector(`[data-flow-title="${stage}"]`).textContent = scenario[stage][0];
    assuranceMap.querySelector(`[data-flow-copy="${stage}"]`).textContent = scenario[stage][1];
  });

  flowSummary.textContent = scenario.summary;
  flowOwner.textContent = scenario.owner;
  flowRecord.textContent = scenario.record;
  restartAssuranceMotion();
}

flowButtons.forEach((button) => {
  button.addEventListener('click', () => selectFlowScenario(button));
});

if (assuranceMap && 'IntersectionObserver' in window) {
  const assuranceObserver = new IntersectionObserver(([entry]) => {
    assuranceMapVisible = entry.isIntersecting;
    syncAssuranceMotion();
  }, { threshold: 0.25 });
  assuranceObserver.observe(assuranceMap);
} else if (assuranceMap) {
  assuranceMapVisible = true;
  syncAssuranceMotion();
}

flowMotionPreference.addEventListener?.('change', syncAssuranceMotion);
document.addEventListener('visibilitychange', syncAssuranceMotion);

const mobileMenu = document.querySelector('.mobile-menu');
mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.removeAttribute('open'));
});
