export function getWeekDay() {
    const date = new Date();
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

export function getCurrentHour() {
    const date = new Date();
    return date.toTimeString().split(' ')[0];
}

export function getCurrentDate() {
    const date = new Date();
    return date.toLocaleDateString('pt-BR');
}

export function formatarData(data) {
    if (data.includes('-')) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }
    return data;
}