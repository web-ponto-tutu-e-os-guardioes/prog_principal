import { getRegisters } from './getStorage.js';
import { setupEdit } from './edit.js';
import { setupDelete } from './delete.js';
import { toggleDetails } from './toggle.js';

function filterByDate(registers, filterType) {
    const now = new Date();
    
    if (filterType === 'last-week') {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        return registers.filter(register => {
            const [dia, mes, ano] = register.data.split('/').map(Number);
            const registerDate = new Date(ano, mes - 1, dia);
            return registerDate >= lastWeek && registerDate <= now;
        });
    }
    
    if (filterType === 'last-month') {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        return registers.filter(register => {
            const [dia, mes, ano] = register.data.split('/').map(Number);
            const registerDate = new Date(ano, mes - 1, dia);
            return registerDate >= lastMonth && registerDate <= now;
        });
    }

    return registers;
}

export function renderList() {
    const filter = document.getElementById('filter').value;
    let registers = getRegisters() || [];
        
    registers = filterByDate(registers, filter);

    const registrosContainer = document.getElementById('registros-relatorio');
    registrosContainer.innerHTML = '';

    if (registers.length === 0) {
        registrosContainer.innerHTML = '<p id="msg-registro-ind">Nenhum registro disponível.</p>';
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

    const datasOrdenadas = Object.keys(registrosPorData).sort((a, b) => {
        const [diaA, mesA, anoA] = a.split('/').map(Number);
        const [diaB, mesB, anoB] = b.split('/').map(Number);

        const dataA = new Date(anoA, mesA - 1, diaA);
        const dataB = new Date(anoB, mesB - 1, diaB);

        return dataB - dataA;
    });

    datasOrdenadas.forEach(date => {
        const divRegistro = document.createElement('div');
        divRegistro.classList.add('registro-item');

        const dataElement = document.createElement('p');
        dataElement.innerHTML = `
            <a href="#" class="toggle-details"> ✅ ${date}</a>
        `;
        divRegistro.appendChild(dataElement);

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('registros-ponto');
        detailsDiv.style.display = 'none';

        registrosPorData[date].sort((a, b) => {
            if (!a.hora || !b.hora) return 0;
            return b.hora.localeCompare(a.hora);
        });

        registrosPorData[date].forEach(register => {
            const link = `https://www.google.com/maps?q=${register.localizacao.latitude},${register.localizacao.longitude}`;
            const detalheRegistro = document.createElement('div');
            detalheRegistro.classList.add('registro-detalhe');

            let arquivoHTML = '';
            if (register.arquivoNome) {
                arquivoHTML = `
                    <p><strong>Anexo:</strong> ${register.arquivoNome}</p>
                    <a href="${register.arquivoDados}" download="${register.arquivoNome}">Baixar Anexo</a>
                `;
            }

            detalheRegistro.innerHTML = `
                <div id="conteudo-${register.id}">
                    <p><strong>Tipo:</strong> ${register.tipo}</p>
                    <p><strong>Horário:</strong> ${register.hora || 'Horário não registrado'}</p>

                    <details class="details-localização">
                    <summary id="div-local"><strong> Localização </strong></summary>
                    <div class="details-content">
                        <p class="registro-details-latitude"><strong>Latitude:</strong> ${register.localizacao.latitude || 'Não possui latitude'}</p>
                        <p class="registro-details-longitude"><strong>Longitude:</strong> ${register.localizacao.longitude || 'Não possui longitude'}</p>
                        <br>
                        <a class="linkGoogle" href="${link}" target="_blank">Abrir localização no Google Maps</a>
                        <div id="map-${register.id}" class="map" style="height: 200px;"></div>  
                    </details>

                    <p><strong>Observações:</strong> ${register.obs || 'Sem observações'}</p>
                    ${arquivoHTML}
                    ${register.isEdited ? '<p style="color:orange;"><strong>Registro editado</strong></p>' : ''}
                    ${register.isPastRegister ? '<p style="color:red;"><strong>Ponto no passado</strong></p>' : ''}
                </div>
                <p class="alert-message" style="display:none; color:red; margin-top: 10px;"></p>
                <div id="botoes-e-msg">
                    <div id="botoes-exc-edit">
                        <button class="editar">✏️</button>
                        <button class="excluir">❌</button>
                    </div>
                </div>
            `;

            detailsDiv.appendChild(detalheRegistro);

            setupEdit(detalheRegistro, register, renderList);
            setupDelete(detalheRegistro);

            const detailsElement = detalheRegistro.querySelector('details');
            detailsElement.addEventListener('toggle', function() {
                if (detailsElement.open) {
                    const mapDiv = detalheRegistro.querySelector(`#map-${register.id}`);
                    const map = L.map(mapDiv).setView([register.localizacao.latitude, register.localizacao.longitude], 13);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    L.marker([register.localizacao.latitude, register.localizacao.longitude]).addTo(map);
                }
            });
        });

        divRegistro.appendChild(detailsDiv);
        registrosContainer.appendChild(divRegistro);

        dataElement.querySelector('.toggle-details').addEventListener('click', function(event) {
            event.preventDefault();
            toggleDetails(detailsDiv);
        });
    });
}

document.getElementById('filter').addEventListener('change', renderList);
