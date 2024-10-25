import { getCurrentHour, getCurrentDate, formatarData } from '../utils/dateTime.js';
import { getCurrentPosition } from './geolocation.js';
import { getRegisterLocalStorage, saveRegisterLocalStorage } from '../utils/storage.js';
import { showAlert } from '../components/alert.js';
import { updateLastRegisterInfo, closeDialogPonto, closeDialogPontoPass } from '../components/dialog.js';
import { generateUniqueId } from '../utils/id.js';

const alertaRegistro = document.getElementById("alerta-registro-ponto");

export async function handleRegister() {
    const typeRegister = document.getElementById("tipos-ponto");
    const inputObservacao = document.getElementById("input-observacao");
    const userCurrentPosition = await getCurrentPosition();

    const ponto = {
        data: getCurrentDate(),
        hora: getCurrentHour(),
        localizacao: userCurrentPosition,
        id: generateUniqueId(),
        tipo: typeRegister.value,
        obs: inputObservacao.value
    };

    // Verificar se já existe um ponto do mesmo tipo no mesmo dia
    const existingPoints = getRegisterLocalStorage().filter(p => p.data === ponto.data && p.tipo === ponto.tipo);
    if (existingPoints.length > 0) {
        alert(`Você já registrou um ponto de tipo ${ponto.tipo} hoje.`);
        return; // Impede o registro de um ponto duplicado
    }

    saveRegisterLocalStorage(ponto);
    updateLastRegisterInfo(ponto);
    showAlert(alertaRegistro);
    closeDialogPonto();
    inputObservacao.value = "";
}

export async function handlePastRegister() {
    const inputData = document.getElementById("data").value;
    const typeRegister = document.getElementById("tipos-ponto-pass");
    const inputJustificativa = document.getElementById("justificativa-pass");
    const arquivoInput = document.getElementById("arquivo-pass");
    const userCurrentPosition = await getCurrentPosition();

    if (!inputData) {
        alert("Não é possível registrar ponto no passado sem uma data!");
        return;
    }

    if (new Date(inputData) > new Date()) {
        alert("Não é possível registrar ponto em uma data futura!");
        return;
    }

    const dataFormatada = formatarData(inputData);

    // Verificar se já existe um ponto do mesmo tipo na data selecionada
    const existingPoints = getRegisterLocalStorage().filter(p => p.data === dataFormatada && p.tipo === typeRegister.value);
    if (existingPoints.length > 0) {
        alert(`Você já registrou um ponto de tipo ${typeRegister.value} nessa data.`);
        return; // Impede o registro de um ponto duplicado no passado
    }

    let arquivoNome = null;
    let arquivoDados = null;
    if (arquivoInput.files.length > 0) {
        const arquivo = arquivoInput.files[0];
        const leitorArquivo = new FileReader();
        
        leitorArquivo.onload = function(evento) {
            arquivoDados = evento.target.result;

            const pontoPassado = {
                data: dataFormatada,
                hora: getCurrentHour(),
                localizacao: userCurrentPosition,
                id: generateUniqueId(),
                tipo: typeRegister.value,
                isPastRegister: true,
                obs: inputJustificativa.value,
                arquivoNome: arquivo?.name || null,
                arquivoDados: arquivoDados || null
            };

            saveRegisterLocalStorage(pontoPassado);
            updateLastRegisterInfo(pontoPassado);
            closeDialogPontoPass();
            showAlert(alertaRegistro);
        };

        leitorArquivo.readAsDataURL(arquivo);
    } else {
        const pontoPassado = {
            data: dataFormatada,
            hora: getCurrentHour(),
            localizacao: userCurrentPosition,
            id: generateUniqueId(),
            tipo: typeRegister.value,
            isPastRegister: true,
            obs: inputJustificativa.value,
            arquivoNome: null,
            arquivoDados: null
        };

        saveRegisterLocalStorage(pontoPassado);
        updateLastRegisterInfo(pontoPassado);
        closeDialogPontoPass();
        showAlert(alertaRegistro);
    }
}
