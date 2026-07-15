from pathlib import Path

from playwright.sync_api import sync_playwright


DESKTOP_OUTPUT = Path("/tmp/matthew-paver-portfolio-desktop.png")
MOBILE_OUTPUT = Path("/tmp/matthew-paver-portfolio-mobile.png")
EXPECTED_COVERS = {
    "cadence-app-v4.png",
    "winchester-app-v4.png",
    "output-gate-app-v4.png",
    "happening-app-v4.png",
    "paper-app-v4.png",
    "triptruth-app-v4.png",
}


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    errors: list[str] = []
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.goto("http://127.0.0.1:8766")
    page.wait_for_load_state("networkidle")

    assert page.title() == "Matthew Paver — Product Shelf"
    assert page.locator("article.product").count() == 6
    assert page.get_by_role("heading", name="Cadence").is_visible()
    assert page.locator("img[width='1200'][height='675']").count() == 6
    page.get_by_role("button", name="Open source", exact=True).click()
    assert page.locator("article.product:visible").count() == 3
    assert page.get_by_role("button", name="Open source", exact=True).get_attribute("aria-pressed") == "true"
    assert "filter=open" in page.url
    page.get_by_role("button", name="All", exact=True).click()
    assert page.locator("article.product:visible").count() == 6
    assert "filter=" not in page.url
    assert not errors, errors

    page.screenshot(path=str(DESKTOP_OUTPUT), full_page=True)
    page.close()

    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    mobile.goto("http://127.0.0.1:8766")
    mobile.wait_for_load_state("networkidle")
    assert mobile.evaluate("document.documentElement.scrollWidth") == 390
    assert mobile.get_by_role("link", name="GitHub", exact=True).is_visible()
    assert mobile.get_by_role("button", name="All", exact=True).bounding_box()["height"] >= 44
    for image in mobile.locator("img[loading='lazy']").all():
        image.scroll_into_view_if_needed()
        image.evaluate("element => element.decode()")
        assert image.evaluate("element => element.naturalWidth") == 1200
    cover_names = {
        Path(image.get_attribute("src")).name
        for image in mobile.locator("article.product img").all()
    }
    assert cover_names == EXPECTED_COVERS
    mobile.screenshot(path=str(MOBILE_OUTPUT), full_page=True)
    mobile.close()
    browser.close()

print(f"Smoke test passed; screenshots: {DESKTOP_OUTPUT}, {MOBILE_OUTPUT}")
