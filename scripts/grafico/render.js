// Função para calcular a diferença de horas entre entrada e saída
function calcularHorasTrabalhadasPorDia() {
    let registros = getRegisterLocalStorage();
    
    // Agrupar registros por data
    let horasPorDia = {};

    registros.forEach(registro => {
        const data = registro.data;
        const hora = registro.hora;
        const tipo = registro.tipo;
        
        // Inicializar o array de registros por data
        if (!horasPorDia[data]) {
            horasPorDia[data] = { entrada: null, saida: null };
        }

        // Identificar a entrada e a saída
        if (tipo === 'entrada') {
            horasPorDia[data].entrada = hora;
        } else if (tipo === 'saida') {
            horasPorDia[data].saida = hora;
        }
    });

    // Calcular a diferença de horas
    let resultados = [];

    for (const data in horasPorDia) {
        const { entrada, saida } = horasPorDia[data];
        if (entrada && saida) {
            const horasTrabalhadas = calcularDiferencaHoras(entrada, saida);
            resultados.push({ data, horasTrabalhadas });
        }
    }

    return resultados;
}

function calcularDiferencaHoras(entrada, saida) {
    const [hEntrada, mEntrada] = entrada.split(':').map(Number);
    const [hSaida, mSaida] = saida.split(':').map(Number);

    const dataEntrada = new Date(0, 0, 0, hEntrada, mEntrada);
    const dataSaida = new Date(0, 0, 0, hSaida, mSaida);

    // Diferença em milissegundos, convertendo para horas
    const diferenca = (dataSaida - dataEntrada) / (1000 * 60 * 60);
    return Math.abs(diferenca);
}

// Recuperar registros do localStorage
function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    return registers ? JSON.parse(registers) : [];
}

// Dados para o gráfico
let resultados = calcularHorasTrabalhadasPorDia();
let labels = resultados.map(item => item.data);  // Datas
let data = resultados.map(item => item.horasTrabalhadas);  // Horas trabalhadas

// Configuração e renderização do gráfico
const ctx = document.getElementById('workHoursChart').getContext('2d');
const workHoursChart = new Chart(ctx, {
    type: 'bar',  // Tipo de gráfico
    data: {
        labels: labels,  // Datas no eixo X
        datasets: [{
            label: 'Horas Trabalhadas',
            data: data,  // Horas no eixo Y
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,  // Começar o eixo Y no zero
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
        }
    }
});
