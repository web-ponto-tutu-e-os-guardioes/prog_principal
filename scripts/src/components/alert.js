export function showAlert(divAlertaRegistroPonto) {
    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");

    setTimeout(() => closeAlert(divAlertaRegistroPonto), 5000);
}

export function closeAlert(divAlertaRegistroPonto) {
    divAlertaRegistroPonto.classList.remove("show");
    divAlertaRegistroPonto.classList.add("hidden");
}
