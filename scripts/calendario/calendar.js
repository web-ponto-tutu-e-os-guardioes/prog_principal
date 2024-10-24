import { getRegisters } from '../relatorio/getStorage.js';

const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  const registers = getRegisters();
  
  const start = new Date(year, month, 1).getDay();

  const endDate = new Date(year, month + 1, 0).getDate();

  const end = new Date(year, month, endDate).getDay();

  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  function checkDayStatus(day) {
    const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
  
    const dayRegisters = registers.filter(reg => 
      reg.date === formattedDate || reg.data === formattedDate
    );
  
    const hasEntrada = dayRegisters.some(reg => reg.type === 'entrada' || reg.tipo === 'entrada');
    const hasSaida = dayRegisters.some(reg => reg.type === 'saida' || reg.tipo === 'saida');
  
    if (hasEntrada && hasSaida) {
      return 'complete';
    }
  
    return '';
  }
  
  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
      ? ' class="today"'
      : '';
  
    const dayStatus = checkDayStatus(i);
  
    if (dayStatus === 'complete') {
      className = ' class="complete"';
    }
  
    datesHtml += `<li${className}>${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}

navs.forEach(nav => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

renderCalendar();

const style = document.createElement('style');
style.innerHTML = `
  .complete {
    background-color: green;
  }
  .today {
    border: 2px solid black; 
    color: black;
    background-color: transparent;
    border-radius: 50%;
  }
`;
document.head.appendChild(style);
