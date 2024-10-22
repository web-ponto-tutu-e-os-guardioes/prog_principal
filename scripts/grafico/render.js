function calcularHorasTrabalhadasPorDia() {
    let registros = getRegisterLocalStorage();
    
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
            resultados.push({ data, horasTrabalhadas: 0 });
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
    const diferencaHoras = diferencaMilissegundos / (1000 * 60 * 60);
    return Math.abs(diferencaHoras); 
}

// Função para obter os registros do localStorage
function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    return registers ? JSON.parse(registers) : [];
}

// Obter os dados para o gráfico
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
