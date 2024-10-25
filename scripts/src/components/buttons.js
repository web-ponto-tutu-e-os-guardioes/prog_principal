import { handleRegister, handlePastRegister } from '../services/registerService.js';
import { closeAlert } from './alert.js';
import { showDialogPonto, showDialogPontoPass, closeDialogPonto, closeDialogPontoPass } from "./dialog.js";

export function setupButtonEvents() {
    const btnBaterPontoPass = document.getElementById("btn-bater-ponto-pass");
    const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
    const btnDialogBaterPontoPass = document.getElementById("btn-dialog-bater-ponto-pass");
    const btnDialogFechar = document.getElementById("btn-dialog-fechar");
    const btnDialogFecharPass = document.getElementById("btn-dialog-fechar-pass");
    const btnCloseAlertRegister = document.getElementById("alerta-registro-ponto-fechar");
    const btnBaterPonto = document.getElementById("btn-bater-ponto");
    const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
    const fileInput = document.getElementById("arquivo-pass");
    const fileChosen = document.getElementById("file-chosen");

    if (btnBaterPontoPass) btnBaterPontoPass.addEventListener("click", showDialogPontoPass);
    if (btnDialogBaterPonto) btnDialogBaterPonto.addEventListener("click", handleRegister);
    if (btnDialogBaterPontoPass) btnDialogBaterPontoPass.addEventListener("click", handlePastRegister);
    if (btnDialogFechar) btnDialogFechar.addEventListener("click", closeDialogPonto);
    if (btnDialogFecharPass) btnDialogFecharPass.addEventListener("click", closeDialogPontoPass);
    if (btnBaterPonto) btnBaterPonto.addEventListener("click", showDialogPonto);
    if (btnCloseAlertRegister) {
        btnCloseAlertRegister.addEventListener("click", () => closeAlert(divAlertaRegistroPonto));
    }
    if (fileInput && fileChosen) {
        fileInput.addEventListener("change", function () {
            fileChosen.textContent = this.files.length ? this.files[0].name : "Nenhum arquivo escolhido";
        });
    }
}
