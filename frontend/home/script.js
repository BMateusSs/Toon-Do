import {methodGet} from '../utils/methods.js'
import {useFetch} from '../utils/useFetch.js'

document.addEventListener('DOMContentLoaded', async () => {
    async function loadingData(){
        const url = 'http://127.0.0.1:5000/tasks/home';
        const config = methodGet()

        const {result, error} = await useFetch(url, config) 

        if (error){
            alert(error)
        }else{
            alert(result)
        }
    }

    

    await loadingData()
})