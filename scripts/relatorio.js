function renderList() {
    const registers = JSON.parse(localStorage.getItem("register")) || [];

    const registrosContainer = document.getElementById('registros-relatorio');
    registrosContainer.innerHTML = '';

    if (registers.length === 0) {
        registrosContainer.innerHTML = '<p>Nenhum registro disponível.</p>';
        return;
    }

    const registrosPorData = registers.reduce((acc, register) => {
        const date = register.data || 'Data não registrada';
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(register);
        return acc;
    }, {});

    Object.keys(registrosPorData).forEach(date => {
        const divRegistro = document.createElement('div');
        divRegistro.classList.add('registro-item');

        const dataElement = document.createElement('p');
        dataElement.innerHTML = `<a href="#" class="toggle-details"> > ${date}</a>`;
        divRegistro.appendChild(dataElement);

        const detailsDiv = document.createElement('div');
        detailsDiv.style.display = 'none';

        registrosPorData[date].forEach(register => {
            const detalheRegistro = document.createElement('div');
            detalheRegistro.innerHTML = `
                <p>Tipo: ${register.tipo || 'Não registrado'}</p>
                <p>Horário: ${register.hora || 'Não registrada'}</p>
                <p>Localização - latitude: ${register.localizacao.latitude || 'Não registrada'}</p>
                <p>Localização - longitude: ${register.localizacao.longitude || 'Não registrada'}</p>
                <p>Observações: ${register.obs || 'Nenhuma'}</p>
                <button class="editar">Editar</button>
                <button class="excluir">Excluir</button>
                <hr>
            `;
            detailsDiv.appendChild(detalheRegistro);
        });

        divRegistro.appendChild(detailsDiv);
        registrosContainer.appendChild(divRegistro);

        dataElement.addEventListener('click', (event) => {
            event.preventDefault();
            detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', renderList);
