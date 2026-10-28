// Pure checks shared by the live monitor and local regression tests.
export function inspectPublicPages(home, catalogue) {
  const content = `${home}\n${catalogue}`;
  return [
    { name: 'homepage links to all projects', pass: /href="\.\/work\/">All projects<\/a>/.test(home) },
    { name: 'homepage offers the CV', pass: /href="[^"]*\/CV\.pdf"/.test(home) },
    { name: 'homepage has four selected cases', pass: (home.match(/<(?:article|div) class="selected-card"/g) || []).length === 4 },
    ...['policylens', 'projectlens', 'rag-regression-gate'].map(slug => ({ name: `homepage features ${slug}`, pass: home.includes(`data-project="${slug}"`) && home.includes(`./work/${slug}/`) })),
    { name: 'catalogue has search', pass: catalogue.includes('data-catalogue-search') },
    ...['policylens', 'projectlens', 'rag-regression-gate', 'quicksupply', 'winchester', 'lakehouse', 'hr', 'england'].map((slug) => ({
      name: `catalogue includes ${slug}`, pass: catalogue.includes(`data-slug="${slug}"`),
    })),
    { name: 'catalogue separates smaller examples', pass: catalogue.includes('id="templates"') },
    { name: 'no private project cards', pass: !/data-status="Private|class="status private"/i.test(content) },
    { name: 'no retired Output Gate or MeetingProof', pass: !/Output Gate|ai-workflow-evaluator|MeetingProof/i.test(content) },
  ];
}
