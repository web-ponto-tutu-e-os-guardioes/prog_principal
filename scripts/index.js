// TO-DO:
// Organizar código-fonte

const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPontoPass = document.getElementById("btn-bater-ponto-pass");
btnBaterPontoPass.addEventListener("click", registerPass);

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");
const dialogPontoPass = document.getElementById("dialog-ponto-pass")

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

const nextRegister = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo", 
    "volta-intervalo": "saida", 
    "saida": "entrada"
}

let registerLocalStorage = getRegisterLocalStorage();

const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const dialogHoraPass = document.getElementById("dialog-hora-pass");
const dialogDataPassada = document.getElementById("dialog-data-pass");


const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");

diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();


async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            }
            resolve(userLocation);
        },
        (error) => {
            reject("Erro ao recuperar a localização " + error);
        });
    });
}

// TO-DO:
// Problema: os 5 segundos continuam contando
const btnCloseAlertRegister = document.getElementById("alerta-registro-ponto-fechar");
btnCloseAlertRegister.addEventListener("click", () => {
    divAlertaRegistroPonto.classList.remove("show");
    divAlertaRegistroPonto.classList.add("hidden");
});

const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", async () => {
    const typeRegister = document.getElementById("tipos-ponto");
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");

    console.log(lastTypeRegister);

    let userCurrentPosition = await getCurrentPosition();

    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": userCurrentPosition,
        "id": 1,
        "tipo": typeRegister.value
    }

    console.log(ponto);

    saveRegisterLocalStorage(ponto);

    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);

    dialogPonto.close();

    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");

    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
        divAlertaRegistroPonto.classList.add("hidden");
    }, 5000);

});

btnDialogBaterPontoPass.addEventListener("click", () => {
    const inputData = document.getElementById("data").value;  // Data escolhida
    const currentDate = new Date();
    const chosenDate = new Date(inputData);

    if (chosenDate > currentDate) {
        alert("Não é possível registrar ponto em uma data futura!");
        return;
    }

    if (chosenDate <= currentDate) {
        // Aqui você salva o ponto no localStorage com uma marcação diferenciada
        let pontoPassado = {
            "data": inputData,
            "hora": getCurrentHour(),
            "localizacao": userCurrentPosition,
            "id": 1,
            "tipo": typeRegister.value,
            "isPastRegister": true // Marcação diferenciada para registro no passado
        };

        saveRegisterLocalStorage(pontoPassado);
        dialogPontoPass.close();

        divAlertaRegistroPonto.classList.remove("hidden");
        divAlertaRegistroPonto.classList.add("show");

        setTimeout(() => {
            divAlertaRegistroPonto.classList.remove("show");
            divAlertaRegistroPonto.classList.add("hidden");
        }, 5000);
    }
});

function generateReport() {
    let registros = getRegisterLocalStorage();

    registros.forEach((registro) => {
        if (registro.isPastRegister) {
            console.log("Registro no passado: ", registro);
            // Aqui você pode estilizar o registro no relatório com uma classe especial
        } else {
            console.log("Registro normal: ", registro);
        }
    });
}


function saveRegisterLocalStorage(register) {
    const typeRegister = document.getElementById("tipos-ponto");
    registerLocalStorage.push(register); // Array
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
    localStorage.setItem("lastTypeRegister", typeRegister.value);
} 

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");

    if(!registers) {
        return [];
    }

    return JSON.parse(registers); 
}

// TO-DO:
// alterar o nome da função
function register() {
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();
    
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");
    if(lastTypeRegister) {
        const typeRegister   = document.getElementById("tipos-ponto");
        typeRegister.value   = nextRegister[lastTypeRegister];
        let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister")
        document.getElementById("dialog-last-register").textContent = lastRegisterText;
    }

    // TO-DO
    // Como "matar" o intervalo a cada vez que o dialog é fechado?
    setInterval(() => {
        dialogHora.textContent = "Hora: " + getCurrentHour();
    }, 1000);

    dialogPonto.showModal();
}

function registerPass() {
    dialogDataPass.textContent = "Data Atual: " + getCurrentDate();
    dialogHoraPass.textContent = "Hora: " + getCurrentHour();
    dialogDataPassada.textContent = "Data Passada: " + getCurrentDate();

    
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");
    if(lastTypeRegister) {
        const typeRegister   = document.getElementById("tipos-ponto");
        typeRegister.value   = nextRegister[lastTypeRegister];
        let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister")
        document.getElementById("dialog-last-register").textContent = lastRegisterText;
    }

    // TO-DO
    // Como "matar" o intervalo a cada vez que o dialog é fechado?
    setInterval(() => {
        dialogHora.textContent = "Hora: " + getCurrentHour();
    }, 1000);

    dialogPonto.showModal();
}

function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function getCurrentDate() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + String(date.getFullYear()).padStart(2, '0');
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}

printCurrentHour();
setInterval(printCurrentHour, 1000);