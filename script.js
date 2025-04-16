const toggle = document.getElementById('toggle');
const body = document.body;

toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
});
