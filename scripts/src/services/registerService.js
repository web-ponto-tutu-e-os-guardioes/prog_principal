import { getCurrentHour, getCurrentDate, formatarData } from '../utils/dateTime.js';
import { getCurrentPosition } from './geolocation.js';
import { getRegisterLocalStorage , saveRegisterLocalStorage } from '../utils/storage.js';
import { showAlert } from '../components/alert.js';
import { updateLastRegisterInfo, closeDialogPonto, closeDialogPontoPass } from '../components/dialog.js';

const alertaRegistro = document.getElementById("alerta-registro-ponto");

export async function handleRegister() {
    const typeRegister = document.getElementById("tipos-ponto");
    const inputObservacao = document.getElementById("input-observacao");
    const userCurrentPosition = await getCurrentPosition();

    const ponto = {
        data: getCurrentDate(),
        hora: getCurrentHour(),
        localizacao: userCurrentPosition,
        id: 1,
        tipo: typeRegister.value,
        obs: inputObservacao.value
    };

    saveRegisterLocalStorage(ponto);
    updateLastRegisterInfo(ponto);
    showAlert(alertaRegistro);
    closeDialogPonto();
    inputObservacao.value = "";
}

export async function handlePastRegister() {
    const inputData = document.getElementById("data").value;
    const typeRegister = document.getElementById("tipos-ponto-pass");
    const inputObservacao = document.getElementById("input-observacao");
    const userCurrentPosition = await getCurrentPosition();

    if (!inputData) {
        alert("Não é possível registrar ponto no passado sem uma data!");
        return;
    }

    if (new Date(inputData) > new Date()) {
        alert("Não é possível registrar ponto em uma data futura!");
        return;
    }
    
    const pontoPassado = {
        data: formatarData(inputData),
        hora: getCurrentHour(),
        localizacao: userCurrentPosition,
        id: getRegisterLocalStorage().length + 1,
        tipo: typeRegister.value,
        isPastRegister: true,
        obs: inputObservacao.value
    };

    saveRegisterLocalStorage(pontoPassado);
    updateLastRegisterInfo(pontoPassado);
    closeDialogPontoPass();
    showAlert(alertaRegistro);
}