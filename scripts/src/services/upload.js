document.getElementById('btn-dialog-bater-ponto-pass').addEventListener('click', function() {
    registrarPontoPassado();
});

function registrarPontoPassado() {

    const data = document.getElementById('data').value;
    const tipoPonto = document.getElementById('tipos-ponto-pass').value;
    const justificativa = document.getElementById('justificativa-pass').value;
    const arquivoInput = document.getElementById('arquivo-pass');
    const arquivo = arquivoInput.files[0];

    if (!data || !tipoPonto) {
        alert('Por favor, preencha a data e o tipo de ponto.');
        return;
    }

    if (arquivo) {
        const leitorArquivo = new FileReader();
        
        leitorArquivo.onload = function (evento) {
            const dadosArquivo = evento.target.result;

            const registrosPonto = JSON.parse(localStorage.getItem('registrosPonto')) || [];
            registrosPonto.push({
                data: data,
                tipoPonto: tipoPonto,
                justificativa: justificativa,
                arquivoNome: arquivo.name,
                arquivoDados: dadosArquivo,
                dataRegistro: new Date().toLocaleString()
            });

            localStorage.setItem('registrosPonto', JSON.stringify(registrosPonto));

            alert('Ponto e justificativa registrados com sucesso!');
            document.getElementById('dialog-ponto-pass').close();
        };

        leitorArquivo.readAsDataURL(arquivo);
    } else {
        const registrosPonto = JSON.parse(localStorage.getItem('registrosPonto')) || [];
        registrosPonto.push({
            data: data,
            tipoPonto: tipoPonto,
            justificativa: justificativa,
            arquivoNome: null,
            arquivoDados: null,
            dataRegistro: new Date().toLocaleString()
        });

        localStorage.setItem('registrosPonto', JSON.stringify(registrosPonto));

        alert('Ponto e justificativa registrados com sucesso!');
        document.getElementById('dialog-ponto-pass').close();
    }
}
