Bem-vindo ao repositório do Projeto Principal! Aqui estão os nossos incríveis colaboradores:

- **tutu**: Speedrunner de Minecraft 🕹️
- **sanderson**: Verdão Feliz 🌿
- **arthur**: Gerente de RH 👥
- **iuri**: Eu 🌟
- **hugo**: Trabalhador 💼

Agradecemos pela sua visita e colaboração!

# Sistema de Controle de Ponto

## Descrição
Este projeto consiste no desenvolvimento de um sistema de controle de ponto eletrônico utilizando apenas **HTML**, **CSS** e **JavaScript**, sem o uso de frameworks ou bibliotecas externas. O principal objetivo é aplicar conceitos de programação web, criando uma aplicação interativa e funcional, com armazenamento de dados no **LocalStorage**.

## Funcionalidades
- Registro de ponto para dias anteriores ao atual (com marcação diferenciada).
- Registro de justificativa para ausência com upload de arquivo.
- Adição de observações a um registro de ponto.
- Edição de registros com diferenciação visual no relatório.
- Visualização de um relatório de pontos, com opção de editar ou excluir (exclusão apenas simula uma ação com um alerta).
- Filtros no relatório para exibir dados da última semana e do último mês.
- Integração com **API de Geolocalização** para registrar automaticamente a localização ao marcar o ponto.
- Visualização de mapa da localização onde o ponto foi registrado.
- Modo escuro/claro para acessibilidade.
- Calendário na página principal indicando dias com ponto de entrada registrado.
- Exportação dos registros para **.txt**.

## Tecnologias Utilizadas
- **HTML**: para a estruturação do layout.
- **CSS**: para estilização e aplicação de temas de acessibilidade.
- **JavaScript**: para interação com a página, manipulação do LocalStorage, e integração com APIs.
- **LocalStorage**: utilizado para armazenar os dados dos registros de ponto localmente no navegador.

## Requisitos Mínimos
1. Registro de ponto:
   - Permitir registros de ponto em dias anteriores ao atual.
   - Bloquear registro de ponto para datas futuras.
   - Visualizar e editar os registros, com marcação diferenciada no relatório.

2. Justificativas:
   - Possibilidade de adicionar justificativas para ausência.
   - Upload de arquivo como parte da justificativa.

3. Relatório de registros:
   - Exibição de um relatório com horários de entrada, saída e intervalos.
   - Filtros para visualização de registros do último mês ou última semana.
   - Botões de edição e exclusão (a exclusão apenas exibe uma mensagem de alerta).
   - Edição atualiza os dados armazenados no LocalStorage.

4. Integração de Geolocalização:
   - Utilização da API de Geolocalização do navegador para capturar a localização ao registrar o ponto.
   - Exibição de um mapa indicando onde o ponto foi registrado.

5. Gráficos:
   - Transformar o relatório de horas trabalhadas em gráficos para melhor visualização dos dados.

6. Acessibilidade:
   - Modo escuro e modo claro para maior acessibilidade do usuário.

7. Calendário:
   - Exibir um calendário com dias em que houve registro de ponto de entrada e saída (marcados em verde).

8. Exportação:
   - Permitir exportar os registros de ponto para um arquivo **.txt**.