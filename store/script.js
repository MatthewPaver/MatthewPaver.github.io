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

document.addEventListener("DOMContentLoaded", initSectionNavigation);
