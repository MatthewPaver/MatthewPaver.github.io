const seed = {
  requests: [
    { id: "REQ-1842", school: "St Anne’s Primary", date: "Today", time: "07:42", subject: "Year 4 General", phase: "Primary", start: "08:30", end: "15:30", status: "Matching", priority: "Urgent", teacher: null, rate: 210 },
    { id: "REQ-1841", school: "Northgate Academy", date: "Today", time: "07:18", subject: "Mathematics", phase: "Secondary", start: "08:15", end: "15:45", status: "Offered", priority: "Urgent", teacher: "Aisha Rahman", rate: 245 },
    { id: "REQ-1839", school: "Oakfield School", date: "Tomorrow", time: "Yesterday", subject: "SEN Support", phase: "Primary", start: "08:30", end: "15:30", status: "Booked", priority: "Standard", teacher: "Daniel Price", rate: 230 },
    { id: "REQ-1835", school: "St Anne’s Primary", date: "Thu 30 Jul", time: "Mon", subject: "Year 2 General", phase: "Primary", start: "08:30", end: "15:30", status: "Booked", priority: "Standard", teacher: "Maya Collins", rate: 210 },
  ],
  teachers: [
    { name: "Maya Collins", initials: "MC", phase: "Primary", subjects: "KS1 · KS2", distance: 3.4, score: 94, compliance: 100, available: true, booked: true, rating: 4.9 },
    { name: "Aisha Rahman", initials: "AR", phase: "Secondary", subjects: "Mathematics", distance: 4.8, score: 91, compliance: 100, available: true, booked: false, rating: 4.8 },
    { name: "Daniel Price", initials: "DP", phase: "Primary", subjects: "SEN · KS2", distance: 6.1, score: 87, compliance: 92, available: true, booked: true, rating: 4.7 },
    { name: "Sophie Bennett", initials: "SB", phase: "Primary", subjects: "EYFS · KS1", distance: 7.2, score: 82, compliance: 75, available: true, booked: false, rating: 4.6 },
  ],
  timesheets: [
    { week: "20–24 Jul", school: "Oakfield School", days: 3, amount: 690, status: "Approved" },
    { week: "13–17 Jul", school: "St Anne’s Primary", days: 2, amount: 420, status: "Paid" },
    { week: "06–10 Jul", school: "Northgate Academy", days: 1, amount: 245, status: "Paid" },
  ],
};

const roles = {
  agency: {
    label: "Desian Education",
    meta: "Operations team",
    initials: "DE",
    nav: [["overview", "Overview"], ["requests", "Requests"], ["matching", "Match desk"], ["compliance", "Compliance"], ["finance", "Finance"]],
  },
  school: {
    label: "St Anne’s Primary",
    meta: "School portal",
    initials: "SA",
    nav: [["school-home", "Today"], ["new-request", "Request cover"], ["school-requests", "My requests"]],
  },
  teacher: {
    label: "Maya Collins",
    meta: "Teacher portal",
    initials: "MC",
    nav: [["teacher-home", "Home"], ["jobs", "Job offers"], ["availability", "Availability"], ["timesheets", "Timesheets"]],
  },
};

const saved = JSON.parse(localStorage.getItem("quicksupply-demo") || "null");
const state = saved || { role: "agency", route: "overview", requests: structuredClone(seed.requests), available: ["Mon", "Tue", "Wed", "Thu", "Fri"] };
const root = document.querySelector("#workspace");
const toast = document.querySelector(".toast");

const money = (value) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const icon = (name) => ({
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>',
  request: '<svg viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6z"/><path d="M9 11h6M9 15h6M9 7h3"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
  people: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2"/></svg>',
})[name];

function persist() {
  localStorage.setItem("quicksupply-demo", JSON.stringify(state));
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 2100);
}

function statusBadge(value) {
  return `<span class="status status-${value.toLowerCase()}"><i></i>${value}</span>`;
}

function pageHead(kicker, title, copy, action = "") {
  return `<section class="page-head"><div><p>${kicker}</p><h1>${title}</h1><span>${copy}</span></div>${action}</section>`;
}

function requestRows(requests = state.requests) {
  return requests.map((item) => `
    <button class="request-row" data-request="${item.id}">
      <span class="request-id"><small>${item.id}</small><strong>${item.subject}</strong><span>${item.school}</span></span>
      <span><small>Date</small><strong>${item.date}</strong><span>${item.start}–${item.end}</span></span>
      <span><small>Teacher</small><strong>${item.teacher || "Unassigned"}</strong><span>${item.phase}</span></span>
      <span>${statusBadge(item.status)}</span>
      <span class="row-arrow">${icon("arrow")}</span>
    </button>`).join("");
}

function overview() {
  const open = state.requests.filter((item) => !["Booked", "Completed"].includes(item.status));
  const booked = state.requests.filter((item) => item.status === "Booked");
  return `
    ${pageHead("AGENCY OPERATIONS · MONDAY 28 JULY", "Good morning, Sarah.", "Here’s the state of today’s cover desk.", `<button class="primary" data-route-link="requests">View all requests ${icon("arrow")}</button>`)}
    <section class="kpi-grid">
      <article class="kpi purple"><span class="kpi-icon">${icon("request")}</span><div><small>Open requests</small><strong>${open.length}</strong><span>${open.filter((item) => item.priority === "Urgent").length} need action now</span></div></article>
      <article class="kpi"><span class="kpi-icon">${icon("clock")}</span><div><small>Median fill time</small><strong>18m</strong><span class="good">↓ 6m this month</span></div></article>
      <article class="kpi"><span class="kpi-icon">${icon("check")}</span><div><small>Booked today</small><strong>${booked.length}</strong><span>${money(booked.reduce((sum, item) => sum + item.rate, 0))} booking value</span></div></article>
      <article class="kpi"><span class="kpi-icon">${icon("people")}</span><div><small>Available teachers</small><strong>${seed.teachers.filter((item) => item.available).length}</strong><span>2 within 5 miles</span></div></article>
    </section>
    <section class="dashboard-layout">
      <article class="panel queue"><header><div><p>LIVE QUEUE</p><h2>Requests needing attention</h2></div><span>${open.length} open</span></header>${requestRows(open.slice(0, 3))}</article>
      <article class="panel activity"><header><div><p>ACTIVITY</p><h2>What just happened</h2></div></header>
        <div><span class="activity-dot booked"></span><p><strong>Daniel Price booked</strong><small>Oakfield School · SEN Support</small><time>8 min ago</time></p></div>
        <div><span class="activity-dot offered"></span><p><strong>Offer sent to Aisha Rahman</strong><small>Northgate Academy · Mathematics</small><time>14 min ago</time></p></div>
        <div><span class="activity-dot request"></span><p><strong>New urgent request</strong><small>St Anne’s Primary · Year 4</small><time>22 min ago</time></p></div>
      </article>
    </section>
    <section class="signal-strip"><div><span>THIS MONTH</span><strong>91% fill rate</strong></div><div><span>AVG RESPONSE</span><strong>4m 12s</strong></div><div><span>SCHOOL SATISFACTION</span><strong>4.8 / 5</strong></div><button data-route-link="finance">Open agency performance ${icon("arrow")}</button></section>`;
}

function requestsView() {
  return `
    ${pageHead("AGENCY · REQUESTS", "Cover request queue", "Track every request from school submission to completed booking.")}
    <section class="filters"><button class="active">All <span>${state.requests.length}</span></button><button>Needs action <span>${state.requests.filter((item) => item.status === "Matching").length}</span></button><button>Offered <span>${state.requests.filter((item) => item.status === "Offered").length}</span></button><button>Booked <span>${state.requests.filter((item) => item.status === "Booked").length}</span></button><label><input id="request-search" placeholder="Search school or subject" /></label></section>
    <section class="panel request-table"><header><div><p>LIVE REQUESTS</p><h2 id="request-count">${state.requests.length} requests</h2></div></header><div id="request-list">${requestRows()}</div></section>`;
}

function matchingView(requestId = state.requests.find((item) => item.status === "Matching")?.id || state.requests[0].id) {
  const request = state.requests.find((item) => item.id === requestId) || state.requests[0];
  const candidates = seed.teachers.filter((item) => item.phase === request.phase).sort((a, b) => b.score - a.score);
  return `
    ${pageHead("AGENCY · MATCH DESK", "Make the next assignment", "The score explains fit; an operator still chooses who receives the offer.")}
    <section class="match-context">
      <div><span>${request.priority}</span><small>${request.id}</small><h2>${request.subject}</h2><p>${request.school} · ${request.date}, ${request.start}–${request.end}</p></div>
      <dl><div><dt>Phase</dt><dd>${request.phase}</dd></div><div><dt>Charge</dt><dd>${money(request.rate)}</dd></div><div><dt>Status</dt><dd>${request.status}</dd></div></dl>
    </section>
    <section class="match-layout">
      <article class="panel candidates"><header><div><p>RANKED CANDIDATES</p><h2>${candidates.length} eligible teachers</h2></div><span>Distance + phase + history</span></header>
        ${candidates.map((teacher, index) => `<div class="candidate">
          <span class="rank">${String(index + 1).padStart(2, "0")}</span><span class="avatar">${teacher.initials}</span>
          <span class="candidate-name"><strong>${teacher.name}</strong><small>${teacher.subjects} · ${teacher.distance} miles · ★ ${teacher.rating}</small></span>
          <span class="score"><strong>${teacher.score}</strong><small>match</small></span>
          <span class="compliance ${teacher.compliance < 100 ? "warning" : ""}">${teacher.compliance}%<small>compliance</small></span>
          <button data-offer="${teacher.name}" data-request-id="${request.id}" ${teacher.compliance < 90 ? "disabled" : ""}>Send offer</button>
        </div>`).join("")}
      </article>
      <aside class="panel rationale"><header><div><p>MATCH EXPLANATION</p><h2>Why Maya ranks first</h2></div></header>
        <div class="factor"><span>Phase and year fit</span><strong>40 / 40</strong><i><b style="width:100%"></b></i></div>
        <div class="factor"><span>Travel distance</span><strong>24 / 25</strong><i><b style="width:96%"></b></i></div>
        <div class="factor"><span>Previous school rating</span><strong>20 / 20</strong><i><b style="width:100%"></b></i></div>
        <div class="factor"><span>Availability confidence</span><strong>10 / 15</strong><i><b style="width:67%"></b></i></div>
        <p>The engine never bypasses availability or compliance blocks. Ties stay visible for an operator decision.</p>
      </aside>
    </section>`;
}

function complianceView() {
  return `
    ${pageHead("AGENCY · SAFEGUARDING", "Compliance at a glance", "See document readiness before a teacher enters the assignment queue.")}
    <section class="compliance-summary"><div><strong>3</strong><span>Ready to place</span></div><div class="warn"><strong>1</strong><span>Needs attention</span></div><p><strong>Sophie Bennett’s safeguarding certificate needs review.</strong><br />She remains visible but cannot be offered work below the configured threshold.</p></section>
    <section class="panel compliance-table"><header><div><p>TEACHER REGISTER</p><h2>Placement readiness</h2></div><button>Export review list</button></header>
      ${seed.teachers.map((teacher) => `<div class="teacher-row"><span class="avatar">${teacher.initials}</span><span><strong>${teacher.name}</strong><small>${teacher.phase} · ${teacher.subjects}</small></span><span><small>DBS</small><strong>Verified</strong></span><span><small>Right to work</small><strong>Verified</strong></span><span><small>Completion</small><strong>${teacher.compliance}%</strong></span>${teacher.compliance === 100 ? statusBadge("Ready") : statusBadge("Review")}</div>`).join("")}
    </section>`;
}

function financeView() {
  return `
    ${pageHead("AGENCY · FINANCE", "Bookings into billable work", "A seeded commercial view of approved cover, payroll exposure and invoices.")}
    <section class="kpi-grid finance-kpis">
      <article class="kpi"><div><small>Booking value · Jul</small><strong>£18,460</strong><span class="good">+12% vs June</span></div></article>
      <article class="kpi"><div><small>Teacher pay accrued</small><strong>£14,190</strong><span>28 approved days</span></div></article>
      <article class="kpi"><div><small>Gross margin</small><strong>23.1%</strong><span>Within 22–25% target</span></div></article>
      <article class="kpi"><div><small>Awaiting approval</small><strong>£920</strong><span>4 timesheets</span></div></article>
    </section>
    <section class="finance-layout"><article class="panel"><header><div><p>WEEKLY BILLING</p><h2>July booking value</h2></div></header><div class="finance-bars">${[["W/C 6 Jul", 3280],["W/C 13 Jul", 4120],["W/C 20 Jul", 4890],["W/C 27 Jul", 6170]].map(([week, value]) => `<div><span>${week}</span><i><b style="height:${value / 70}px"></b></i><strong>${money(value)}</strong></div>`).join("")}</div></article>
      <article class="panel invoice-list"><header><div><p>INVOICE QUEUE</p><h2>Ready for review</h2></div></header>${[["INV-1048","St Anne’s Primary","£1,260","Ready"],["INV-1047","Oakfield School","£920","Review"],["INV-1046","Northgate Academy","£1,470","Ready"]].map((row) => `<div><span><small>${row[0]}</small><strong>${row[1]}</strong></span><b>${row[2]}</b>${statusBadge(row[3])}</div>`).join("")}</article></section>`;
}

function schoolHome() {
  const schoolRequests = state.requests.filter((item) => item.school === "St Anne’s Primary");
  return `
    ${pageHead("SCHOOL PORTAL · MONDAY 28 JULY", "Morning, Helen.", "Your cover position for today and the next action to take.", `<button class="primary" data-route-link="new-request">Request cover ${icon("arrow")}</button>`)}
    <section class="school-status"><article><span class="big-icon booked">${icon("check")}</span><div><p>TODAY</p><h2>1 teacher booked</h2><span>Maya Collins · Year 2 · arriving 08:15</span></div><button>View booking</button></article><article><span class="big-icon pending">${icon("clock")}</span><div><p>URGENT REQUEST</p><h2>Year 4 cover is matching</h2><span>Submitted 07:42 · agency is reviewing candidates</span></div><button data-route-link="school-requests">Track request</button></article></section>
    <section class="panel school-requests"><header><div><p>MY REQUESTS</p><h2>Recent cover</h2></div><span>${schoolRequests.length} records</span></header>${requestRows(schoolRequests)}</section>`;
}

function newRequest() {
  return `
    ${pageHead("SCHOOL · NEW REQUEST", "Tell the agency what you need", "Submit the operational facts once, then track the same record through matching and booking.")}
    <form class="request-form panel" id="cover-form">
      <header><div><p>REQUEST DETAILS</p><h2>Cover for St Anne’s Primary</h2></div><span>Typical completion: 90 seconds</span></header>
      <div class="form-grid">
        <label><span>Date</span><select name="date"><option>Today</option><option>Tomorrow</option><option>Thu 30 Jul</option></select></label>
        <label><span>Phase</span><select name="phase"><option>Primary</option><option>Secondary</option></select></label>
        <label class="wide"><span>Class or subject</span><input name="subject" required value="Year 5 General" /></label>
        <label><span>Start time</span><input name="start" type="time" value="08:30" /></label>
        <label><span>End time</span><input name="end" type="time" value="15:30" /></label>
        <label class="wide"><span>Notes for the teacher</span><textarea name="notes" rows="3">Planning is in the shared drive. Please report to reception.</textarea></label>
      </div>
      <div class="form-footer"><p><strong>What happens next?</strong><br />The agency checks availability and compliance, then sends one offer at a time.</p><button class="primary" type="submit">Submit cover request ${icon("arrow")}</button></div>
    </form>`;
}

function schoolRequestsView() {
  const records = state.requests.filter((item) => item.school === "St Anne’s Primary");
  return `${pageHead("SCHOOL · REQUESTS", "Every request, one status", "No telephone chase is needed to know whether the agency is matching, offering or booked.")}
    <section class="request-timeline panel">${records.map((item) => `<article><header><div><small>${item.id} · ${item.date}</small><h2>${item.subject}</h2></div>${statusBadge(item.status)}</header><div class="timeline">${["Submitted","Matching","Offered","Booked"].map((step, index) => { const current = ["Matching","Offered","Booked"].indexOf(item.status) + 2; return `<span class="${index < current ? "done" : ""}"><i>${index < current ? "✓" : index + 1}</i><small>${step}</small></span>`; }).join("")}</div><p>${item.teacher ? `<strong>${item.teacher}</strong> is attached to this request.` : "The agency is ranking eligible teachers now."}</p></article>`).join("")}</section>`;
}

function teacherHome() {
  const offers = state.requests.filter((item) => item.teacher === "Maya Collins" && ["Offered", "Booked"].includes(item.status));
  return `
    ${pageHead("TEACHER PORTAL · MONDAY 28 JULY", "Morning, Maya.", "Your bookings, open offers and timesheet position.")}
    <section class="teacher-hero"><div><p>NEXT BOOKING</p><span>THU<em>30</em>JUL</span><h2>St Anne’s Primary</h2><strong>Year 2 General · 08:30–15:30</strong><small>3.4 miles · £210 day rate</small><button>Open booking details ${icon("arrow")}</button></div><aside><p>THIS MONTH</p><strong>£2,140</strong><span>approved pay</span><dl><div><dt>Days worked</dt><dd>10</dd></div><div><dt>Rating</dt><dd>4.9</dd></div></dl></aside></section>
    <section class="teacher-grid"><article class="panel"><header><div><p>JOB OFFERS</p><h2>${offers.filter((item) => item.status === "Offered").length || "No"} waiting</h2></div><button data-route-link="jobs">View offers</button></header><div class="empty-offers">${offers.some((item) => item.status === "Offered") ? "A school is waiting for your response." : "You’re all caught up. New suitable offers will appear here."}</div></article><article class="panel"><header><div><p>TIMESHEETS</p><h2>1 needs action</h2></div><button data-route-link="timesheets">Open timesheets</button></header><div class="timesheet-alert"><span>${icon("clock")}</span><p><strong>Oakfield School · 3 days</strong><small>Submit by Friday to enter the next pay run.</small></p></div></article></section>`;
}

function jobsView() {
  const suitable = state.requests.filter((item) => item.phase === "Primary" && ["Matching", "Offered"].includes(item.status));
  return `
    ${pageHead("TEACHER · JOB OFFERS", "Work that matches your profile", "Availability and compliance are checked before an offer reaches this list.")}
    <section class="job-list">${suitable.map((item) => `<article><div class="job-date"><span>${item.date === "Today" ? "TODAY" : item.date.toUpperCase()}</span><strong>${item.start}</strong><small>to ${item.end}</small></div><div class="job-copy"><span>${item.phase} · ${item.priority}</span><h2>${item.subject}</h2><p>${item.school} · 3.4 miles away</p><dl><div><dt>Day rate</dt><dd>${money(item.rate)}</dd></div><div><dt>Status</dt><dd>${item.teacher === "Maya Collins" ? item.status : "Open"}</dd></div></dl></div><div class="job-actions"><button class="decline">Not available</button><button data-accept="${item.id}">Accept offer</button></div></article>`).join("")}</section>`;
}

function availabilityView() {
  const days = ["Mon","Tue","Wed","Thu","Fri"];
  return `
    ${pageHead("TEACHER · AVAILABILITY", "Set the week once", "The match desk only ranks you on days you have marked available.")}
    <section class="availability panel"><header><div><p>W/C 27 JULY</p><h2>Weekly availability</h2></div><span>${state.available.length} days available</span></header><div class="day-grid">${days.map((day, index) => `<button data-day="${day}" class="${state.available.includes(day) ? "available" : ""}"><small>${day}</small><strong>${27 + index}</strong><span>${state.available.includes(day) ? "Available" : "Unavailable"}</span></button>`).join("")}</div><div class="availability-foot"><p>Changes apply to future matching. Existing bookings are never cancelled automatically.</p><button class="primary" id="save-availability">Save availability</button></div></section>`;
}

function timesheetsView() {
  return `
    ${pageHead("TEACHER · TIMESHEETS", "From worked day to paid day", "Submit the record, let the school approve it, then track the pay state.")}
    <section class="timesheet-list panel"><header><div><p>PAY RECORDS</p><h2>Recent timesheets</h2></div><span>£1,355 total</span></header>${seed.timesheets.map((item, index) => `<div><span><small>${item.week}</small><strong>${item.school}</strong></span><span><small>Days</small><strong>${item.days}</strong></span><span><small>Gross pay</small><strong>${money(item.amount)}</strong></span>${statusBadge(item.status)}${index === 0 ? `<button id="submit-timesheet">Submit details</button>` : `<button>View</button>`}</div>`).join("")}</section>`;
}

const views = { overview, requests: requestsView, matching: matchingView, compliance: complianceView, finance: financeView, "school-home": schoolHome, "new-request": newRequest, "school-requests": schoolRequestsView, "teacher-home": teacherHome, jobs: jobsView, availability: availabilityView, timesheets: timesheetsView };

function bind() {
  document.querySelectorAll("[data-route-link]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.routeLink)));
  document.querySelectorAll("[data-request]").forEach((button) => button.addEventListener("click", () => { state.route = "matching"; persist(); render(button.dataset.request); }));
  document.querySelectorAll("[data-offer]").forEach((button) => button.addEventListener("click", () => {
    const request = state.requests.find((item) => item.id === button.dataset.requestId);
    request.teacher = button.dataset.offer; request.status = "Offered"; persist(); notify(`Offer sent to ${request.teacher}`); render(request.id);
  }));
  document.querySelector("#request-search")?.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const matches = state.requests.filter((item) => `${item.school} ${item.subject} ${item.id}`.toLowerCase().includes(query));
    document.querySelector("#request-list").innerHTML = requestRows(matches);
    document.querySelector("#request-count").textContent = `${matches.length} requests`;
  });
  document.querySelector("#cover-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const request = { id: `REQ-${1843 + state.requests.length}`, school: "St Anne’s Primary", date: form.get("date"), time: "Just now", subject: form.get("subject"), phase: form.get("phase"), start: form.get("start"), end: form.get("end"), status: "Matching", priority: form.get("date") === "Today" ? "Urgent" : "Standard", teacher: null, rate: 210 };
    state.requests.unshift(request); persist(); notify("Cover request submitted to the agency"); navigate("school-requests");
  });
  document.querySelectorAll("[data-accept]").forEach((button) => button.addEventListener("click", () => {
    const request = state.requests.find((item) => item.id === button.dataset.accept);
    request.teacher = "Maya Collins"; request.status = "Booked"; persist(); notify("Booking accepted — school and agency updated"); render();
  }));
  document.querySelectorAll("[data-day]").forEach((button) => button.addEventListener("click", () => {
    const day = button.dataset.day;
    state.available = state.available.includes(day) ? state.available.filter((item) => item !== day) : [...state.available, day];
    persist(); render();
  }));
  document.querySelector("#save-availability")?.addEventListener("click", () => notify("Availability saved for the demo week"));
  document.querySelector("#submit-timesheet")?.addEventListener("click", () => notify("Timesheet submitted for school approval"));
}

function navigate(route) {
  state.route = route;
  persist();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function render(requestId) {
  const role = roles[state.role];
  if (!role.nav.some(([route]) => route === state.route)) state.route = role.nav[0][0];
  document.querySelector("#role-card").innerHTML = `<span>${role.initials}</span><div><strong>${role.label}</strong><small>${role.meta}</small></div>`;
  document.querySelector("#navigation").innerHTML = role.nav.map(([route, label]) => `<button class="${route === state.route ? "active" : ""}" data-nav="${route}"><span></span>${label}</button>`).join("");
  document.querySelectorAll("[data-role]").forEach((button) => button.classList.toggle("active", button.dataset.role === state.role));
  root.innerHTML = state.route === "matching" ? matchingView(requestId) : views[state.route]();
  document.querySelectorAll("[data-nav]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.nav)));
  bind();
}

document.querySelectorAll("[data-role]").forEach((button) => button.addEventListener("click", () => { state.role = button.dataset.role; state.route = roles[state.role].nav[0][0]; persist(); render(); }));
document.querySelector("#reset").addEventListener("click", () => { localStorage.removeItem("quicksupply-demo"); Object.assign(state, { role: "agency", route: "overview", requests: structuredClone(seed.requests), available: ["Mon","Tue","Wed","Thu","Fri"] }); render(); notify("Demo data reset"); });
render();
