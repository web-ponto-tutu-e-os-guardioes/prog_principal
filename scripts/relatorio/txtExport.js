import { getRegisters } from './getStorage.js'

export function gerarTxt() {
    const registros = getRegisters();

    if (registros.length === 0) {
        alert('Nenhum registro disponível para exportar.');
        return;
    }

    let conteudo = 'Relatório de Pontos Eletrônicos\n\n';

    registros.forEach(register => {
        conteudo += `Data: ${register.data}\n`;
        conteudo += `Horário: ${register.hora || 'Horário não registrado'}\n`;
        conteudo += `Tipo: ${register.tipo}\n`;
        conteudo += `Latitude: ${register.localizacao.latitude || 'Não possui latitude'}\n`;
        conteudo += `Longitude: ${register.localizacao.longitude || 'Não possui longitude'}\n`;
        conteudo += `Observações: ${register.obs || 'Sem observações'}\n`;
        conteudo += `Status: ${register.isEdited ? 'Editado' : 'Original'}, ${register.isPastRegister ? 'Ponto no passado' : 'Ponto atual'}\n`;
        conteudo += '----------------------------------\n';
    });

    const blob = new Blob([conteudo], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'relatorio_pontos.txt';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}


