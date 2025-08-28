import {useFetch} from '../../utils/useFetch.js'


document.addEventListener('DOMContentLoaded', () => {
    console.log("JS carregado!");

    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('erro-message'); // corrigido
    const login = document.getElementById('email-user');
    const password = document.getElementById('password');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // agora vai funcionar

        const url = 'http://127.0.0.1:5000/auth/login';

        const body = {
            credential: login.value,
            password: password.value
        };

        const {result, error} = await useFetch(url, body);

        if (error) {
            errorMessage.innerHTML = error;
        } else {
            const token = result.token;
            alert(token);
            localStorage.setItem('token', token);
        }
    });
});
