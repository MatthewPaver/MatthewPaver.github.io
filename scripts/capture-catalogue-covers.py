"""Capture the actual catalogue at desktop/mobile widths; no composited mock-ups."""
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--url', default='http://127.0.0.1:4321/work/')
parser.add_argument('--output', default='.impeccable/review/catalogue-covers-2026-09-05')
parser.add_argument('--browser', help='Optional existing Chromium executable; otherwise use the Python Playwright installation')
args = parser.parse_args()
output = Path(args.output)
output.mkdir(parents=True, exist_ok=True)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, executable_path=args.browser)
    for name, width, height, scheme in [
        ('desktop', 1440, 1000, 'light'),
        ('mobile', 390, 844, 'light'),
        ('dark', 1440, 1000, 'dark'),
    ]:
        page = browser.new_page(viewport={'width': width, 'height': height}, color_scheme=scheme, reduced_motion='reduce')
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(args.url, wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        for slug in ['policylens', 'projectlens', 'quicksupply', 'winchester', 'lakehouse', 'hr', 'england']:
            cover = page.locator(f'[data-slug="{slug}"] .app-cover')
            cover.scroll_into_view_if_needed()
            cover.locator('img').evaluate_all('(images) => Promise.all(images.map(image => image.decode()))')
            cover.screenshot(path=str(output / f'{name}-{slug}.png'))
        page.locator('[data-slug="quicksupply"]').evaluate('(card) => window.scrollTo(0, card.offsetTop - 90)')
        page.screenshot(path=str(output / f'{name}-catalogue.png'))
        print({'viewport': name, 'pageErrors': errors, 'width': width, 'scrollWidth': page.evaluate('document.documentElement.scrollWidth')})
        page.close()
    browser.close()
