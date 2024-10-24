import { getCurrentHour, getCurrentDate } from '../utils/dateTime.js'

const dialogPonto = document.getElementById("dialog-ponto");
const dialogPontoPass = document.getElementById("dialog-ponto-pass");

export function updateLastRegisterInfo(ponto) {
    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);
    localStorage.setItem("lastTypeRegister", ponto.tipo);
}

export function getLastPoint() {
    let lastType = localStorage.getItem("lastTypeRegister");
    let lastDate = localStorage.getItem("lastDateRegister");
    let lastTime = localStorage.getItem("lastTimeRegister");

    if (!lastDate || !lastTime || !lastType) {
        return "Nenhum ponto registrado";
    }

    return `Último ponto registrado: ${lastType} às ${lastTime} de ${lastDate}`;
}

export function showDialogPonto() {
    dialogPonto.showModal();
}

export function closeDialogPonto() {
    dialogPonto.close();
}

export function showDialogPontoPass() {
    dialogPontoPass.showModal();
}

export function closeDialogPontoPass() {
    dialogPontoPass.close();
}

const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const dialogHoraPass = document.getElementById("dialog-hora-pass");

dialogData.textContent = "Data: " + getCurrentDate();
dialogHoraPass.textContent = "Hora: " + getCurrentHour();

setInterval(() => {
    dialogHora.textContent ="Hora: " +  getCurrentHour();
});