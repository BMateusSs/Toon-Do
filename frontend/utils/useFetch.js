export async function useFetch(url, body) {
    let error = null;
    let result = null

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        result = await response.json();

        if (response.ok) {
            alert('Usuário registrado com sucesso!');
            
        } else {
            error = result.error
        }

    } catch (err) {
        error = 'Ocorreu um erro ao tentar se conectar ao servidor.'
    } finally {
        return {result, error}
    }
}