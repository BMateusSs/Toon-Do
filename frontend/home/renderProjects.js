import { useFetch } from "../utils/useFetch.js"
import { methodGet } from "../utils/methods.js"
import { darkenColor } from "../utils/helpers.js"

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

            const daysRemaining = remaining === 0 ? "Até hoje" : remaining === 1 ? "1 dia restante" :
                                    remaining > 1 ? `${remaining} dias restantes` : "Fora do prazo"
            
            project.innerHTML = `
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
                    <p class="text barlow-semibold">${proj.total_task} tarefas</p> 
                    <p class="text barlow-semibold">${daysRemaining}</p>
                </div>
            `;

            project.style.backgroundColor = `#${proj.color}`;
            
            const darkerColor = darkenColor(proj.color, 50);

            const progressFill = project.querySelector(".progress-fill");
            const progressPercent = project.querySelector(".percent-text");
            
            progressFill.style.width = `${proj.percent}%`;
            progressFill.style.backgroundColor = `${darkerColor}`;
            progressPercent.textContent = `${proj.percent}%`;

            project.classList.add("card");
            element.appendChild(project);
        });
        }
}
