import {useFetch} from '../../utils/useFetch'

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-meaage');
    const login = document.getElementById('email-user');
    const password = document.getElementById('password')

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const url = 'http://127.0.0.1:5000/auth/login';

        body = {
            credential: login.value,
            password: password.value
        }

        const {result, error} = await useFetch(url, body);

        if (error){
            errorMessage.innerHTML=error
        }else {
            const token = result.token
            localStorage.setItem('token', token);
        }
    })
})