import { getRegisters } from './getStorage.js';
import { setupEdit } from './edit.js';
import { setupDelete } from './delete.js';
import { toggleDetails } from './toggle.js';

export function renderList() {
    const registers = getRegisters() || [];
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

    function formatarData(data) {
        const [dia, mes, ano] = data.split('/');
        return `${ano}-${mes}-${dia}`;
    }

    const datasOrdenadas = Object.keys(registrosPorData).sort((a, b) => {
        const dataA = new Date(formatarData(a));
        const dataB = new Date(formatarData(b));
        return dataB - dataA;
    });

    datasOrdenadas.forEach(date => {
        const divRegistro = document.createElement('div');
        divRegistro.classList.add('registro-item');

        const dataElement = document.createElement('p');
        dataElement.innerHTML = `<a href="#" class="toggle-details"> > ${date}</a>`;
        divRegistro.appendChild(dataElement);

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        detailsDiv.style.display = 'none';

        registrosPorData[date].forEach((register, index) => {
            const detalheRegistro = document.createElement('div');
            detalheRegistro.classList.add('registro-detalhe');
            detalheRegistro.innerHTML = `
                <div id="conteudo">
                    <p><strong>Tipo:</strong> ${register.tipo}</p>
                    <p><strong>Horário:</strong> ${register.hora || 'Horário não registrado'}</p>
                    <p><strong>Latitude:</strong> ${register.localizacao.latitude || 'Não possui latitude'}</p>
                    <p><strong>Longitude:</strong> ${register.localizacao.longitude || 'Não possui longitude'}</p>
                    <p><strong>Observações:</strong> ${register.obs || 'Sem observações'}</p>
                </div>
                <div>
                    <button class="editar">✏️</button>
                    <button class="excluir">❌</button>
                </div>
                <p class="alert-message" style="display:none; color:red; margin-top: 10px;"></p>
            `;

            detailsDiv.appendChild(detalheRegistro);

            setupEdit(detalheRegistro, register, index, renderList);
            setupDelete(detalheRegistro);
        });

        divRegistro.appendChild(detailsDiv);
        registrosContainer.appendChild(divRegistro);

        dataElement.querySelector('.toggle-details').addEventListener('click', function(event) {
            event.preventDefault();
            toggleDetails(detailsDiv);
        });
    });
}
