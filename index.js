// Update the #currentDate element with a localized date string and schedule daily updates at midnight
document.addEventListener('DOMContentLoaded', () => {
  function updateDate() {
    const el = document.getElementById('currentDate');
    if (!el) {
      // If the element doesn't exist, there's nothing to update
      return;
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    el.textContent = new Date().toLocaleDateString('en-US', options);
  }

  // Update immediately once DOM is ready
  updateDate();

  // Schedule exact midnight update: calculate milliseconds until next midnight,
  // then set a timeout for that delay and schedule a 24-hour interval thereafter.
  function scheduleDailyUpdateAtMidnight() {
    const now = new Date();
    // Set to next midnight (start of next day)
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    // Run once at next midnight, then every 24 hours
    setTimeout(() => {
      try { updateDate(); } catch (e) { console.error('Error updating date:', e); }
      setInterval(() => {
        try { updateDate(); } catch (e) { console.error('Error updating date:', e); }
      }, 24 * 60 * 60 * 1000); // 24 hours
    }, msUntilMidnight);
  }

  // Only schedule midnight updates if the element exists on the page
  if (document.getElementById('currentDate')) {
    scheduleDailyUpdateAtMidnight();
  }
});

// Simple digital clock updating every second
// Simple digital clock updating every second
function updateClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return; // If missing, just skip
    const now = new Date();

    // Format time with leading zeros
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    clockEl.textContent = timeString;
}

// Update immediately, then schedule aligned second updates (only if #clock exists)
if (document.getElementById('clock')) {
  function scheduleClock() {
    updateClock();
    // Align to next second boundary
    const now = new Date();
    const delay = 1000 - now.getMilliseconds();
    setTimeout(() => {
      // Respect page visibility: don't spin when hidden
      if (document.hidden) {
        // Try again on visibility change
        document.addEventListener('visibilitychange', function onVis() {
          if (!document.hidden) {
            document.removeEventListener('visibilitychange', onVis);
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