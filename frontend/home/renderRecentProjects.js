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
            project.classList.add('card');
            projectsContainer.appendChild(project);
        });
        }
}
