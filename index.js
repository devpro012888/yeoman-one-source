// Update the #currentDate element with a localized date string and schedule daily updates at midnight
document.addEventListener("DOMContentLoaded", () => {
  const toggleLeftBtn = document.getElementById("toggleLeftSidebar");
  const toggleRightBtn = document.getElementById("toggleRightSidebar");
  const leftSidebar =
    document.getElementById("left-drawer") ||
    document.querySelector(".sidebar");
  const rightSidebar =
    document.getElementById("right-drawer") ||
    document.querySelector(".sidebar2");
  const overlay = document.getElementById("overlay");

  function setAriaFor(button, drawer, open) {
    if (button) button.setAttribute("aria-expanded", open ? "true" : "false");
    if (drawer) drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (overlay) overlay.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function closeAll() {
    if (leftSidebar) leftSidebar.classList.remove("show");
    if (rightSidebar) rightSidebar.classList.remove("show");
    if (toggleLeftBtn) {
      toggleLeftBtn.setAttribute("aria-expanded", "false");
      toggleLeftBtn.classList.remove("open");
    }
    if (toggleRightBtn) {
      toggleRightBtn.setAttribute("aria-expanded", "false");
      toggleRightBtn.classList.remove("open");
    }
    if (overlay) overlay.classList.remove("open");
    setAriaFor(toggleLeftBtn, leftSidebar, false);
    setAriaFor(toggleRightBtn, rightSidebar, false);
  }

  function openDrawer(drawer, opener) {
    // Close other drawer
    if (drawer === leftSidebar && rightSidebar) {
      rightSidebar.classList.remove("show");
      if (toggleRightBtn) {
        toggleRightBtn.setAttribute("aria-expanded", "false");
        toggleRightBtn.classList.remove("open");
      }
    }
    if (drawer === rightSidebar && leftSidebar) {
      leftSidebar.classList.remove("show");
      if (toggleLeftBtn) {
        toggleLeftBtn.setAttribute("aria-expanded", "false");
        toggleLeftBtn.classList.remove("open");
      }
    }

    const willOpen = !drawer.classList.contains("show");
    if (willOpen) {
      drawer.classList.add("show");
      if (opener) opener.classList.add("open");
      if (overlay) overlay.classList.add("open");
      setAriaFor(opener, drawer, true);
      // Move focus into drawer (first focusable)
      const focusable = drawer.querySelector(
        'a, button, input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable) focusable.focus();
    } else {
      drawer.classList.remove("show");
      if (opener) opener.classList.remove("open");
      if (overlay) overlay.classList.remove("open");
      setAriaFor(opener, drawer, false);
      if (opener) opener.focus();
    }
  }

  if (toggleLeftBtn && leftSidebar) {
    toggleLeftBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDrawer(leftSidebar, toggleLeftBtn);
    });
  }

  if (toggleRightBtn && rightSidebar) {
    toggleRightBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDrawer(rightSidebar, toggleRightBtn);
    });
  }

  // Close buttons inside sidebars
  const closeLeftBtn = document.getElementById("closeLeftSidebar");
  const closeRightBtn = document.getElementById("closeRightSidebar");

  if (closeLeftBtn && leftSidebar) {
    closeLeftBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAll();
      if (toggleLeftBtn) toggleLeftBtn.focus();
    });
  }

  if (closeRightBtn && rightSidebar) {
    closeRightBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAll();
      if (toggleRightBtn) toggleRightBtn.focus();
    });
  }

  // Clicking the overlay closes drawers
  if (overlay) {
    overlay.addEventListener("click", () => {
      closeAll();
    });
  }

  // Clicking main content closes drawers
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    mainContent.addEventListener("click", () => {
      closeAll();
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeAll();
    }
  });

  function updateDate() {
    const el = document.getElementById("currentDate");
    if (!el) return;
    const options = { year: "numeric", month: "long", day: "numeric" };
    el.textContent = new Date().toLocaleDateString("en-US", options);
  }

  updateDate();

  function scheduleDailyUpdateAtMidnight() {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();
    setTimeout(() => {
      try {
        updateDate();
      } catch (e) {
        console.error(e);
      }
      setInterval(
        () => {
          try {
            updateDate();
          } catch (e) {
            console.error(e);
          }
        },
        24 * 60 * 60 * 1000,
      );
    }, msUntilMidnight);
  }

  if (document.getElementById("currentDate")) scheduleDailyUpdateAtMidnight();
});

// Simple digital clock updating every second
function updateClock() {
  const clockEl = document.getElementById("clock");
  if (!clockEl) return;
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

if (document.getElementById("clock")) {
  function scheduleClock() {
    updateClock();
    const now = new Date();
    const delay = 1000 - now.getMilliseconds();
    setTimeout(() => {
      if (document.hidden) {
        document.addEventListener("visibilitychange", function onVis() {
          if (!document.hidden) {
            document.removeEventListener("visibilitychange", onVis);
            scheduleClock();
          }
        });
        return;
      }
      scheduleClock();
    }, delay);
  }
  scheduleClock();
}
