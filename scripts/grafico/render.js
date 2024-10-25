import { getRegisters } from '../relatorio/getStorage.js'

function calcularHorasTrabalhadasPorDia() {
    let registros = getRegisters();
    
    let horasPorDia = {};

    registros.forEach(registro => {
        const data = registro.data;
        const hora = registro.hora;
        const tipo = registro.tipo;
        
        if (!horasPorDia[data]) {
            horasPorDia[data] = { entrada: null, saida: null };
        }

        if (tipo === 'entrada') {
            horasPorDia[data].entrada = hora;
        } else if (tipo === 'saida') {
            horasPorDia[data].saida = hora;
        }
    });

    let resultados = [];

    for (const data in horasPorDia) {
        const { entrada, saida } = horasPorDia[data];
        if (entrada && saida) {
            const horasTrabalhadas = calcularDiferencaHoras(entrada, saida);
            resultados.push({ data, horasTrabalhadas });
        } else {
            resultados.push({ data, horasTrabalhadas: '0 horas 0 minutos' });
        }
    }

    return resultados;
}

function calcularDiferencaHoras(entrada, saida) {
    const [hEntrada, mEntrada] = entrada.split(':').map(Number);
    const [hSaida, mSaida] = saida.split(':').map(Number);

    const dataEntrada = new Date(0, 0, 0, hEntrada, mEntrada);
    const dataSaida = new Date(0, 0, 0, hSaida, mSaida);

    const diferencaMilissegundos = dataSaida - dataEntrada;
    const diferencaMinutos = diferencaMilissegundos / (1000 * 60);

    const horas = Math.floor(diferencaMinutos / 60);
    const minutos = Math.floor(diferencaMinutos % 60);

    return `${horas} horas ${minutos} minutos`;
}

let resultados = calcularHorasTrabalhadasPorDia();
let labels = resultados.map(item => item.data);
let data = resultados.map(item => item.horasTrabalhadas);

const ctx = document.getElementById('workHoursChart').getContext('2d');
const workHoursChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Horas Trabalhadas',
            data: data.map(item => {
                const [horas, minutos] = item.match(/\d+/g).map(Number);
                return horas + minutos / 60;
            }),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Horas'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Data'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const label = resultados[tooltipItem.dataIndex].horasTrabalhadas;
                        return `${label}`;
                    }
                }
            }
        }
    }
});