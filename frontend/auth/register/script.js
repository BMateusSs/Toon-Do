import { useFetch } from '../../utils/useFetch.js';

document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const errorMessage = document.getElementById("erro-message");

    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        errorMessage.innerHTML = '';

        if (passwordInput.value !== confirmPasswordInput.value) {
            errorMessage.innerHTML = 'As senhas não são iguais.';
            return;
        }

        const url = 'http://127.0.0.1:5000/auth/register';
        const body = {
            name: nameInput.value,
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        const { result, error } = await useFetch(url, body);

        if (error) {
            errorMessage.innerHTML = error;
        } else {
            alert('Usuário registrado com sucesso!');
        }
    });
});
