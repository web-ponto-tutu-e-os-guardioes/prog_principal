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

        registrosPorData[date].forEach((register, index) => {
            const detalheRegistro = document.createElement('div');
            detalheRegistro.innerHTML = `
                <p>Tipo: ${register.tipo || 'Não registrado'}</p>
                <p>Horário: ${register.hora || 'Não registrada'}</p>
                <p>Localização - latitude: ${register.localizacao.latitude || 'Não registrada'}</p>
                <p>Localização - longitude: ${register.localizacao.longitude || 'Não registrada'}</p>
                <p>Observações: ${register.obs || 'Nenhuma'}</p>
                <button class="editar">Editar</button>
                <button class="excluir">Excluir</button>
                <div class="alert-message" style="display:none; color:red; margin-top: 10px;"></div>
                <hr>
            `;
            detailsDiv.appendChild(detalheRegistro);

            const editarButton = detalheRegistro.querySelector('.editar');
            editarButton.addEventListener('click', () => {
                // Criar o formulário de edição
                detalheRegistro.innerHTML = `
                    <form class="form-edicao">
                        <label>Tipo:</label>
                        <select name="tipos-ponto">
                            <option value="entrada" ${register.tipo === 'entrada' ? 'selected' : ''}>Entrada</option>
                            <option value="intervalo" ${register.tipo === 'intervalo' ? 'selected' : ''}>Intervalo</option>
                            <option value="volta-intervalo" ${register.tipo === 'volta-intervalo' ? 'selected' : ''}>Volta Intervalo</option>
                            <option value="saida" ${register.tipo === 'saida' ? 'selected' : ''}>Saída</option>
                        </select>
                        <label>Horário:</label>
                        <input type="time" name="hora" value="${register.hora ? register.hora.substring(0, 5) : ''}">
                        <label>Localização - latitude:</label>
                        <input type="text" name="latitude" value="${register.localizacao.latitude || ''}">
                        <label>Localização - longitude:</label>
                        <input type="text" name="longitude" value="${register.localizacao.longitude || ''}">
                        <label>Observações:</label>
                        <input type="text" name="obs" value="${register.obs || ''}">
                        <button type="submit">Salvar</button>
                        <button type="button" class="cancelar-edicao">Cancelar</button>
                    </form>
                `;

                const form = detalheRegistro.querySelector('.form-edicao');
                form.addEventListener('submit', (event) => {
                    event.preventDefault();

                    const now = new Date();
                    const selectedTime = form.hora.value;

                    if (new Date(`${now.toDateString()} ${selectedTime}`) > now) {
                        alert("O horário não pode ser no futuro. Insira um horário válido.");
                        return;
                    }

                    const updatedRegister = {
                        ...register,
                        tipo: form['tipos-ponto'].value,
                        hora: form.hora.value,
                        localizacao: {
                            latitude: form.latitude.value,
                            longitude: form.longitude.value
                        },
                        obs: form.obs.value
                    };

                    registers[index] = updatedRegister;
                    localStorage.setItem('register', JSON.stringify(registers));

                    renderList();
                });

                const cancelarButton = detalheRegistro.querySelector('.cancelar-edicao');
                cancelarButton.addEventListener('click', () => {
                    renderList();
                });
            });

            const excluirButton = detalheRegistro.querySelector('.excluir');
            const alertMessage = detalheRegistro.querySelector('.alert-message');

            excluirButton.addEventListener('click', () => {
                alertMessage.textContent = "Não é possível excluir este registro.";
                alertMessage.style.display = 'block';

                setTimeout(() => {
                    alertMessage.style.display = 'none';
                }, 5000);
            });
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
