const daysContainer = document.getElementById("days");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let date = new Date();

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

  daysContainer.innerHTML = "";
  monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

  for (let i = firstDay; i > 0; i--) {
    daysContainer.innerHTML += `<div class="prev-date">${prevLastDate - i + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    const isToday = isCurrentMonth && i === today.getDate();
    daysContainer.innerHTML += `<div class="${isToday ? 'today' : ''}">${i}</div>`;
  }

  const nextDays = 42 - daysContainer.children.length;
  for (let i = 1; i <= nextDays; i++) {
    daysContainer.innerHTML += `<div class="next-date">${i}</div>`;
  }
}

prevBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
