export function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy ?? "";
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          copied = true;
        }
      } catch {}
      if (!copied) {
        window.prompt("Copy this command:", value);
      }
      const original = button.textContent;
      button.textContent = copied ? "Copied" : "Select and copy";
      setTimeout(() => {
        button.textContent = original;
      }, 1800);
    });
  });
}
