export function setupDelete(detalheRegistro) {
    const excluirButton = detalheRegistro.querySelector('.excluir');
    const alertMessage = detalheRegistro.querySelector('.alert-message');

    excluirButton.addEventListener('click', () => {
        alertMessage.textContent = "Não é possível excluir este registro.";
        alertMessage.style.display = 'block';

        setTimeout(() => {
            alertMessage.style.display = 'none';
        }, 5000);
    });
}
