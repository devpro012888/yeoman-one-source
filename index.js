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

  scheduleDailyUpdateAtMidnight();
});