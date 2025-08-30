import {methodGet} from '../utils/methods.js'
import {useFetch} from '../utils/useFetch.js'

document.addEventListener('DOMContentLoaded', async () => {
    async function loadingData(){
        
        const projectsContainer = document.querySelector(".recent-projects");

        const url = 'http://127.0.0.1:5000/tasks/home';
        const config = methodGet();

        const {result, error} = await useFetch(url, config);

        if (error){
            alert(error);
        } else {
            
            const recentProjects = result.recent_projects;
            const tasksToday = result.tasks_today;

            renderTasksToday(tasksToday);
            
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

                    const daysRemaining = remaining === 0 ? 'Até hoje' : remaining === 1 ? '1 dia restante' : `${remaining} dias restantes`

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
    }
    await loadingData();
});

function renderTasksToday(tasksToday){
    
    const container = document.querySelector('.tasks-today');
    container.innerHTML=``
    if (tasksToday.length === 0){
        container.innerHTML = `
            <div class="empty-container tasks barlow-bold">
                Sem tarefas para hoje. Adicionar +
            </div>
        `;
    } else {
        tasksToday.forEach((task) => {
            const card = document.createElement('div');
            const date = formatDate(task.limit_date)
            card.innerHTML = `
            <div class="date-task">
                <p class="barlow-regular">${date}</p>
            </div>
            <div class="task-title">
                <p class="barlow-bold">${task.title}</p>
            </div>
            <div>
                <p class="barlow-regular">${task.description}</p>
            </div>
            `;
            
            card.classList.add('task-card')
            card.style.borderColor = `#${task.proj_color}`
            container.appendChild(card);
        });
}
}

function formatDate(dataString) {
  // Mapeamento dos dias da semana e meses em português
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const mesesDoAno = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  // Cria um objeto Date a partir da string
  const data = new Date(dataString);

  // Extrai o dia da semana, o dia do mês e o mês
  const diaDaSemana = diasDaSemana[data.getDay()];
  const diaDoMes = data.getDate();
  const mes = mesesDoAno[data.getMonth()];

  // Retorna a data formatada
  return `${diaDaSemana}, ${diaDoMes} ${mes}`;
}



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