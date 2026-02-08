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

  // CSV export
  const exportBtn = document.getElementById("exportCsv");
  if (exportBtn && tbody) {
    exportBtn.addEventListener("click", function () {
      const visibleRows = rows().filter((r) => r.style.display !== "none");
      const csv = visibleRows
        .map((r) =>
          Array.from(r.cells)
            .map((c) => '"' + c.textContent.replace(/"/g, '""') + '"')
            .join(","),
        )
        .join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "forms.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  // Print button
  const printBtn = document.getElementById("printBtn");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

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
