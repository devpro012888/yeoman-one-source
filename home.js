// Calendar improvements: accessibility, events, keyboard nav, today, week start, transitions
const daysContainer = document.getElementById("days");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");
const todayBtn = document.getElementById("todayBtn");
const weekStartToggle = document.getElementById("weekStartToggle");
const dayNamesContainer = document.getElementById("dayNames");

let date = new Date();
let weekStartsOnMonday = false;
const events = {
  // Example: '2025-05-31': 'Memorial Day',
  '2025-06-09': 'Paycut',
  '2025-06-14': 'Flag Day',
};

function renderDayNames() {
  const days = weekStartsOnMonday
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNamesContainer.innerHTML = days.map(d => `<div>${d}</div>`).join('');
}

function renderCalendar(transitionDir = 0) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

  // Month/Year dropdowns
  monthSelect.innerHTML = Array.from({length: 12}, (_, i) => `<option value="${i}" ${i===month?'selected':''}>${new Date(0,i).toLocaleString('default',{month:'long'})}</option>`).join('');
  yearSelect.innerHTML = Array.from({length: 21}, (_, i) => {
    const y = today.getFullYear() - 10 + i;
    return `<option value="${y}" ${y===year?'selected':''}>${y}</option>`;
  }).join('');

  // Animate month change
  daysContainer.style.opacity = 0;
  setTimeout(() => {
    // Calculate first day index
    let firstDay = new Date(year, month, 1).getDay();
    if (weekStartsOnMonday) firstDay = (firstDay + 6) % 7;
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();
    daysContainer.innerHTML = "";
    // Previous month's days
    for (let i = firstDay; i > 0; i--) {
      daysContainer.innerHTML += `<div class="prev-date" tabindex="-1">${prevLastDate - i + 1}</div>`;
    }
    // Current month's days
    for (let i = 1; i <= lastDate; i++) {
      const isToday = isCurrentMonth && i === today.getDate();
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
      const hasEvent = events[dateStr];
      let classes = [];
      if (isToday) classes.push('today');
      // Weekend highlight
      let dayIdx = (firstDay + i - 1) % 7;
      if (weekStartsOnMonday) dayIdx = (dayIdx + 1) % 7;
      if (dayIdx === 0 || dayIdx === 6) classes.push('weekend');
      if (hasEvent) classes.push('event-day');
      daysContainer.innerHTML += `<div class="${classes.join(' ')}" tabindex="0" aria-label="${dateStr}${hasEvent ? ': ' + hasEvent : ''}">${i}</div>`;
    }
    // Next month's days
    const nextDays = 42 - daysContainer.children.length;
    for (let i = 1; i <= nextDays; i++) {
      daysContainer.innerHTML += `<div class="next-date" tabindex="-1">${i}</div>`;
    }
    daysContainer.style.opacity = 1;
  }, 120);
}

function goToToday() {
  date = new Date();
  renderCalendar();
}

prevBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar(-1);
});

nextBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar(1);
});

monthSelect.addEventListener('change', e => {
  date.setMonth(Number(e.target.value));
  renderCalendar();
});
yearSelect.addEventListener('change', e => {
  date.setFullYear(Number(e.target.value));
  renderCalendar();
});
todayBtn.addEventListener('click', goToToday);
weekStartToggle.addEventListener('change', e => {
  weekStartsOnMonday = e.target.checked;
  renderDayNames();
  renderCalendar();
});

// Keyboard navigation
let lastFocusedDay = null;
daysContainer.addEventListener('keydown', e => {
  const days = Array.from(daysContainer.querySelectorAll('div[tabindex="0"]'));
  let idx = days.indexOf(document.activeElement);
  if (idx === -1) idx = 0;
  if (e.key === 'ArrowRight') {
    if (idx < days.length - 1) days[idx + 1].focus();
    e.preventDefault();
  } else if (e.key === 'ArrowLeft') {
    if (idx > 0) days[idx - 1].focus();
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (idx + 7 < days.length) days[idx + 7].focus();
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    if (idx - 7 >= 0) days[idx - 7].focus();
    e.preventDefault();
  }
});

daysContainer.addEventListener('focusin', e => {
  lastFocusedDay = e.target;
});
daysContainer.addEventListener('focusout', e => {
  lastFocusedDay = null;
});

daysContainer.addEventListener('mouseover', e => {
  if (e.target.matches('.days div[aria-label]')) {
    e.target.setAttribute('title', e.target.getAttribute('aria-label'));
  }
});

// Initial render
renderDayNames();
renderCalendar();
