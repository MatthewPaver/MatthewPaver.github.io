from pathlib import Path

from playwright.sync_api import sync_playwright


OUTPUT = Path("/tmp/matthew-paver-product-shelf.png")


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    errors: list[str] = []
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.goto("http://127.0.0.1:8766")
    page.wait_for_load_state("networkidle")

    assert page.title() == "Matthew Paver — Product Shelf"
    assert page.locator("article.product").count() == 6
    page.get_by_role("button", name="Open source").click()
    assert page.locator("article.product:not(.hidden)").count() == 3
    page.get_by_role("button", name="Private pilots").click()
    assert page.locator("article.product:not(.hidden)").count() == 3
    assert not errors, errors

    page.get_by_role("button", name="All").click()
    page.screenshot(path=str(OUTPUT), full_page=True)
    browser.close()

print(f"Smoke test passed; screenshot: {OUTPUT}")
