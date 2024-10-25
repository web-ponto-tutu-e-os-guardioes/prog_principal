import { getRegisters, updateRegisters } from './getStorage.js';

export function setupEdit(detalheRegistro, register, renderList) {
    const editarButton = detalheRegistro.querySelector('.editar');
    editarButton.addEventListener('click', () => {
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
                <input type="time" step="1" name="hora" value="${register.hora ? new Date(`1970-01-01T${register.hora}Z`).toISOString().substring(11, 19) : ''}">
                <label>Latitude:</label>
                <input type="text" name="latitude" value="${register.localizacao.latitude || ''}">
                <label>Longitude:</label>
                <input type="text" name="longitude" value="${register.localizacao.longitude || ''}">
                <label>Observações:</label>
                <input type="text" name="obs" value="${register.obs || ''}">
                <div id="botoes-edit">
                    <button type="submit">Salvar</button>
                    <button type="button" class="cancelar-edicao">Cancelar</button>
                </div>
            </form>
        `;

        const form = detalheRegistro.querySelector('.form-edicao');
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const now = new Date();
            const selectedTime = form.hora.value;
            const selectedDateTime = new Date(`1970-01-01T${selectedTime}`);
            const currentTime = new Date();
            currentTime.setFullYear(1970, 0, 1);

            if (selectedDateTime > currentTime) {
                alert("O horário não pode ser no futuro. Insira um horário válido.");
                return;
            }

            const updatedRegister = {
                ...register,
                tipo: form['tipos-ponto'].value,
                hora: selectedTime,
                localizacao: {
                    latitude: form.latitude.value,
                    longitude: form.longitude.value
                },
                obs: form.obs.value,
                isEdited: true
            };

            const registers = getRegisters();
            const registerIndex = registers.findIndex(r => r.id === register.id);
            if (registerIndex !== -1) {
                registers[registerIndex] = updatedRegister;
                updateRegisters(registers);
                renderList();
            }
        });

        const cancelarButton = detalheRegistro.querySelector('.cancelar-edicao');
        cancelarButton.addEventListener('click', () => {
            renderList();
        });
    });
}
