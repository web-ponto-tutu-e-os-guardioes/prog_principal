const toggleButton = document.getElementById('ClaroEscuro');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});
