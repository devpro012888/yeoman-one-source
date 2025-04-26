// Display today's date
const dateToday = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

document.addEventListener('DOMContentLoaded', () => {
  const dateTodayElement = document.getElementById('dateToday');
  if (dateTodayElement) {
    dateTodayElement.textContent = dateToday.toLocaleDateString(undefined, options);
  }
});