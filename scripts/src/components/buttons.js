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

    btnBaterPontoPass.addEventListener("click", showDialogPontoPass);
    btnDialogBaterPonto.addEventListener("click", handleRegister);
    btnDialogBaterPontoPass.addEventListener("click", handlePastRegister);
    btnDialogFechar.addEventListener("click", closeDialogPonto);
    btnDialogFecharPass.addEventListener("click", closeDialogPontoPass);
    btnBaterPonto.addEventListener("click", showDialogPonto);
    btnCloseAlertRegister.addEventListener("click", () => 
        closeAlert(divAlertaRegistroPonto)
    );
}