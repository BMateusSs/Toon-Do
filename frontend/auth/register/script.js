const registrationForm = document.getElementById('registrationForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const errorMessage = document.getElementById("erro-message")

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // 1. Corrigido: Operador de comparação e uso do .value
    if (passwordInput.value !== confirmPasswordInput.value) {
        alert('As senhas não são iguais.');
        return;
    }
    
    // Chama a função para registrar
    await registerUser();
});

async function registerUser() {
    const url = 'http://127.0.0.1:5000/auth/register';
    
    // 2. Corrigido: Pegando os VALORES dos campos
    const data = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    try {
        // 3. Corrigido: Adicionado `await` para o fetch
        const response = await fetch(url, {
            method: "POST", // Método deve ser em maiúsculas
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // 4. Corrigido: Adicionado `await` para o response.json()
        const result = await response.json();

        if (response.ok) {
            alert('Usuário registrado com sucesso!');
            errorMessage.textContent = ''
        } else {
            errorMessage.textContent = result.error
        }

    } catch (err) {
        // Trata erros de rede ou servidor fora do ar
        console.error('Erro na requisição:', err);
        alert('Ocorreu um erro ao tentar se conectar ao servidor.');
    }
}