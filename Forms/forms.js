// Client-side search, CSV export, and simple mobile-friendly row click
(function () {
  const search = document.getElementById("tableSearch");
  const table = document.querySelector(".forms-table");
  const tbody = table && table.tBodies[0];
  const rows = () => Array.from(tbody ? tbody.rows : []);
  const countEl = document.getElementById("formCount");

  function updateCount() {
    if (!countEl) return;
    const visible = rows().filter((r) => r.style.display !== "none").length;
    countEl.textContent = `Showing: ${visible}`;
  }

  if (search && tbody) {
    search.addEventListener("input", function (e) {
      const q = e.target.value.trim().toLowerCase();
      rows().forEach((tr) => {
        const txt = tr.textContent.toLowerCase();
        tr.style.display = q === "" || txt.includes(q) ? "" : "none";
      });
      updateCount();
    });
  }

  // Make rows clickable for anchors (mobile friendly)
  document.addEventListener("click", function (e) {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const a = tr.querySelector("a");
    if (
      a &&
      e.target.tagName.toLowerCase() !== "a" &&
      e.target.tagName.toLowerCase() !== "button"
    ) {
      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      if (!href) return;
      if (target === "_blank") window.open(href, "_blank");
      else window.location = href;
    }
  });

  // Initial count
  updateCount();
})();
