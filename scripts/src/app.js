import { setupButtonEvents } from './components/buttons.js';
import { printCurrentHour } from './components/clock.js';
import { getLastPoint } from './components/dialog.js';
import { getWeekDay, getCurrentDate } from './utils/dateTime.js';

document.getElementById("dia-semana").textContent = getWeekDay();
document.getElementById("dia-mes-ano").textContent = getCurrentDate();

const lastPoint = document.getElementById("dialog-last-register");

printCurrentHour(document.getElementById("hora-min-seg")); // chamando de novo pra começar o contador de uma vez, em vez de esperar o setInterval

setInterval(() => {
    lastPoint.textContent = getLastPoint();
}, 1000);

setupButtonEvents();

setInterval(() => {
    printCurrentHour(document.getElementById("hora-min-seg"));
}, 1000);