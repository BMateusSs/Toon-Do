import {methodGet} from '../utils/methods.js'
import {useFetch} from '../utils/useFetch.js'

document.addEventListener('DOMContentLoaded', async () => {
    


    async function loadingData(){
        const totalProjects = document.querySelector(".total-projects");
        const projects = document.querySelector(".recent-projects")

        const url = 'http://127.0.0.1:5000/tasks/home';
        const config = methodGet()

        const {result, error} = await useFetch(url, config) 

        if (error){
            alert(error)
        }else{
            totalProjects.innerHTML=`${result.total_projects}`
            const recentProjects = result.recent_projects;

            // Apenas a parte do loop
        recentProjects.forEach((proj) => {
            const project = document.createElement('div') 
            project.innerHTML=`
                <div class="header">
                    <p class="date-text barlow-regular">29 ago, 2025</p>
                    <div class="category-container">
                        <p class="barlow-regular category-text">Estudo</p>
                    </div>
                </div>
                <div class="content">
                    <h3 class="title barlow-bold">
                        ${proj.title}
                    </h3>
                    <div class="progress">
                        <div class="progress-details">
                            <p class="barlow-semibold">Progresso</p>
                            <p class="barlow-semibold percent-text"></p>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <p class="text barlow-semibold">3 tarefas</p> 
                    <p class="text barlow-semibold">1 dia restante</p>
                </div>
            `
            const color = darkenColor(proj.color, 50)

            const progressFill = project.querySelector('.progress-fill')
            const progressPercent = project.querySelector('.percent-text')
            
            progressFill.style.width = '80%'
            progressFill.style.backgroundColor = `${color}`
            progressPercent.textContent = '80%'

            project.classList.add('card')
            project.style.backgroundColor = `#${proj.color}`
            projects.appendChild(project)
        })
        }
    }

    

    await loadingData()
})

function darkenColor(hex, percent) {
    // Remove o '#' se existir
    hex = hex.replace(/^#/, '');

    // Converte hex para RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Escurece cada componente RGB
    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);

    // Garante que os valores não fiquem abaixo de 0
    r = (r < 0) ? 0 : r;
    g = (g < 0) ? 0 : g;
    b = (b < 0) ? 0 : b;

    // Converte RGB de volta para hex
    const toHex = (c) => ('0' + c.toString(16)).slice(-2);
    return '#' + toHex(r) + toHex(g) + toHex(b);
}