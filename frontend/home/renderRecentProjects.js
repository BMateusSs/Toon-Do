import {darkenColor} from '../utils/helpers.js'

export function renderRecentProjects(recentProjects){
    const projectsContainer = document.querySelector('.recent-projects')
    projectsContainer.innerHTML=``
    if (recentProjects.length === 0){
        projectsContainer.innerHTML = `
            <div class="empty-container projects barlow-bold">
                Sem projetos. Adicionar +
            </div>
        `;
    }else {
        recentProjects.forEach((proj) => {
            const project = document.createElement('div');
            const remaining = proj.days_remaining

            const daysRemaining = remaining === 0 ? 'Até hoje' : remaining === 1 ? '1 dia restante' :
                                    remaining > 1 ? `${remaining} dias restantes` : 'Fora do prazo'
            
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

            const progressFill = project.querySelector('.progress-fill');
            const progressPercent = project.querySelector('.percent-text');
            
            progressFill.style.width = `${proj.percent}%`;
            progressFill.style.backgroundColor = `${darkerColor}`;
            progressPercent.textContent = `${proj.percent}%`;

            project.classList.add('card');
            projectsContainer.appendChild(project);
        });
        }
}
