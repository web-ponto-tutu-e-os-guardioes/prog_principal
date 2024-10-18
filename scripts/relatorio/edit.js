import { getRegisters, updateRegisters } from './getStorage.js';

// TO-DO: horario deve conter os segundos também na hora da edicao, testar...

export function setupEdit(detalheRegistro, register, index, renderList) {
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

            const registers = getRegisters();
            registers[index] = updatedRegister;
            updateRegisters(registers);

            renderList();
        });

        const cancelarButton = detalheRegistro.querySelector('.cancelar-edicao');
        cancelarButton.addEventListener('click', () => {
            renderList();
        });
    });
}
