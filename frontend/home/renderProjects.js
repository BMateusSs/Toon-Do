import { useFetch } from "../utils/useFetch.js"
import { methodGet } from "../utils/methods.js"
import { darkenColor } from "../utils/helpers.js"
import { renderKanban } from "./renderKanban.js"

export async function renderProjects(){
    const finishedContainer = document.querySelector(".finished-projects")
    const progressContainer = document.querySelector(".progress-projects")
    const pendingContainer = document.querySelector(".pending-projects")
    

    const url = "http://127.0.0.1:5000/tasks/all_projects"
    const config = methodGet()
    const {result, error} = await useFetch(url, config)

    if (error) {
        console.error("Erro ao buscar projetos:", error)
        return
    }

    const pending = result.pending;
    const progress = result.progress;
    const finished = result.finished;

    renderProjectCard(pendingContainer, pending)
    renderProjectCard(progressContainer, progress)
    renderProjectCard(finishedContainer, finished)
}

function renderProjectCard(element, projects){
    if (projects.length === 0){
        element.innerHTML = `
            <div class="empty-container projects barlow-bold">
                Sem projetos. Adicionar +
            </div>
        `;
    }else {
        element.innerHTML = "";
        projects.forEach((proj) => {
            const project = document.createElement("div");
            const remaining = proj.days_remaining
            
            project.innerHTML = `
                <div class="header">
                    
                    
                </div>
                <div class="content">
                    <div class="progress-details">
                        <p class="barlow-semibold percent-text"></p>
                    </div>
                    <h3 class="title barlow-bold">
                        ${proj.title}
                    </h3>
                
                </div>
                <div class="bottom">
                    <p class="text barlow-semibold">${proj.total_task} tarefas</p> 
                </div>
            `;

            const darkerColor = darkenColor(proj.color, 25);

            const progressPercent = project.querySelector('.percent-text');
            const progressDetails = project.querySelector('.progress-details');
            const header = project.querySelector('.header')
        
            progressPercent.textContent = `${proj.percent}%`;
            header.style.backgroundColor = `#${proj.color}`;
            progressDetails.style.backgroundColor = darkerColor;

            project.classList.add("card");
            element.appendChild(project);

            project.addEventListener('click', () => {
                console.log('esta entrandooo')
                const pages = document.querySelectorAll('.content-block')

                pages.forEach((page) => {
                    page.classList.remove('active-content')
                })

                const page = document.getElementById('kanban')
                page.classList.add('active-content')
                renderKanban(proj.proj_id)
            })
        });
        }
}
