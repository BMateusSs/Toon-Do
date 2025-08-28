export async function useFetch(url, config) {
    let error = null;
    let result = null

    try {
        const response = await fetch(url, config);

        result = await response.json();

        if (!response.ok) {
            error = result.error
        }

    } catch (err) {
        error = 'Ocorreu um erro ao tentar se conectar ao servidor.'
    } finally {
        return {result, error}
    }
}