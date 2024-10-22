// Elementos do DOM
const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPontoPass = document.getElementById("btn-bater-ponto-pass");
const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
const btnDialogBaterPontoPass = document.getElementById("btn-dialog-bater-ponto-pass");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const btnDialogFecharPass = document.getElementById("btn-dialog-fechar-pass");
const btnCloseAlertRegister = document.getElementById("alerta-registro-ponto-fechar");

const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
const dialogPonto = document.getElementById("dialog-ponto");
const dialogPontoPass = document.getElementById("dialog-ponto-pass");
const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const dialogHoraPass = document.getElementById("dialog-hora-pass");
const dialogDataPassada = document.getElementById("dialog-data-pass");
const btnBaterPonto = document.getElementById("btn-bater-ponto");

const dialogLastRegister = document.getElementById("dialog-last-register");

let registerLocalStorage = getRegisterLocalStorage();

// Exibir informações iniciais
diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();
printCurrentHour();
setInterval(printCurrentHour, 1000);

// Adicionar eventos aos botões
btnBaterPontoPass.addEventListener("click", () => {
    dialogPontoPass.showModal(); // Para abrir o diálogo como modal
});
btnDialogBaterPonto.addEventListener("click", handleRegister);
btnDialogBaterPontoPass.addEventListener("click", handlePastRegister)
btnDialogFechar.addEventListener("click", () => dialogPonto.close());
btnDialogFecharPass.addEventListener("click", () => dialogPontoPass.close());
btnCloseAlertRegister.addEventListener("click", closeAlert);
btnBaterPonto.addEventListener("click", () => {
    dialogPonto.showModal(); // Para abrir o diálogo como modal
});

// Mapeamento dos tipos de registro
const nextRegister = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo", 
    "volta-intervalo": "saida", 
    "saida": "entrada"
};

// Funções principais
async function handleRegister() {
    const typeRegister = document.getElementById("tipos-ponto");
    let inputObservacao = document.getElementById("input-observacao");
    let userCurrentPosition = await getCurrentPosition();

    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": userCurrentPosition,
        "id": 1,
        "tipo": typeRegister.value,
        "obs": inputObservacao.value
    };

    saveRegisterLocalStorage(ponto);
    updateLastRegisterInfo(ponto);
    showAlert();

    inputObservacao.value = "";
}

function formatarData(data) {
    if (data.includes('-')) {
        const [ano, mes, dia] = data.split('-');            // formatar a data para '/' em vez de -
        return `${dia}/${mes}/${ano}`;
    }
    return data;
}

async function handlePastRegister() {
    const inputData = document.getElementById("data").value;
    const typeRegister = document.getElementById("tipos-ponto");
    const inputObservacao = document.getElementById("input-observacao");
    const currentDate = new Date();
    const chosenDate = new Date(inputData);
    
    let userCurrentPosition = await getCurrentPosition();

    if (chosenDate > currentDate) {
        alert("Não é possível registrar ponto em uma data futura!");
        return;
    }

    let pontoPassado = {
        "data": formatarData(inputData),
        "hora": getCurrentHour(),
        "localizacao": userCurrentPosition,
        "id": registerLocalStorage.length + 1,
        "tipo": typeRegister.value,
        "isPastRegister": true,
        "obs": inputObservacao.value
    };

    saveRegisterLocalStorage(pontoPassado);
    dialogPontoPass.close();
    showAlert();
}

// Funções auxiliares
function showAlert() {
    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");

    setTimeout(closeAlert, 5000);
}

function closeAlert() {
    divAlertaRegistroPonto.classList.remove("show");
    divAlertaRegistroPonto.classList.add("hidden");
}

function updateLastRegisterInfo(ponto) {
    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);
    localStorage.setItem("lastTypeRegister", ponto.tipo);
}

async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            });
        },
        (error) => {
            reject("Erro ao recuperar a localização: " + error);
        });
    });
}

function saveRegisterLocalStorage(register) {
    registerLocalStorage.push(register);
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
}

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    return registers ? JSON.parse(registers) : [];
}

function getWeekDay() {
    const date = new Date();
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return date.toTimeString().split(' ')[0]; // HH:MM:SS
}

function getCurrentDate() {
    const date = new Date();
    return date.toLocaleDateString('pt-BR'); // DD/MM/YYYY
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}

function getLastPoint() {
    let lastType = localStorage.getItem("lastTypeRegister");
    let lastDate = localStorage.getItem("lastDateRegister");
    let lastTime = localStorage.getItem("lastTimeRegister");

    return "Ultimo ponto registrado: \n" + lastType + "\nàs " + lastTime + "\nde " + lastDate;
}

setInterval(() => {
    dialogLastRegister.textContent = getLastPoint();        // mudar a cada segundo no dialog o ultimo ponto registrado 
}, 1000);