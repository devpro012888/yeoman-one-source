// Display today's date
const dateToday = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let currentDate = new Date(); // Track the currently displayed month

document.addEventListener('DOMContentLoaded', () => {
  const dateTodayElement = document.getElementById('dateToday');
  if (dateTodayElement) {
    dateTodayElement.textContent = dateToday.toLocaleDateString(undefined, options);
  }

  // Generate the initial calendar
  generateCalendar(currentDate);

  // Add event listeners for navigation buttons
  const prevButton = document.getElementById('prevMonth');
  const nextButton = document.getElementById('nextMonth');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendar(currentDate);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendar(currentDate);
    });
  }
});

function generateCalendar(date) {
  const calendar = document.getElementById('calendar');
  if (!calendar) return;

  calendar.innerHTML = '';

  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startDay = monthStart.getDay();

  // Display the current month and year
  const monthYearElement = document.getElementById('monthYear');
  if (monthYearElement) {
    const monthOptions = { month: 'long', year: 'numeric' };
    monthYearElement.textContent = date.toLocaleDateString(undefined, monthOptions);
  }

  // Add days of the week headers
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysOfWeek.forEach(day => {
    const div = document.createElement('div');
    div.textContent = day;
    div.classList.add('header');
    calendar.appendChild(div);
  });

  // Add empty divs for days before the start of the month
  for (let i = 0; i < startDay; i++) {
    const div = document.createElement('div');
    div.textContent = '';
    calendar.appendChild(div);
  }

  // Add days of the month
  for (let d = 1; d <= monthEnd.getDate(); d++) {
    const div = document.createElement('div');
    div.textContent = d;

    if (
      d === dateToday.getDate() &&
      date.getMonth() === dateToday.getMonth() &&
      date.getFullYear() === dateToday.getFullYear()
    ) {
      div.classList.add('today');
    }

    calendar.appendChild(div);
  }
}