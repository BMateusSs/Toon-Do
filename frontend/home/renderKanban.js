import { methodPost } from '../utils/methods.js'
import { useFetch } from '../utils/useFetch.js'
import { formatDate } from '../utils/helpers.js'

const status = {
    'kanban-pending': 'pending',
    'kanban-progress': 'progress',
    'kanban-finished': 'finished'
}

export async function renderKanban(projectId = 4){  
    const pending = document.getElementById('kanban-pending')
    const finished = document.getElementById('kanban-finished')
    const progress = document.getElementById('kanban-progress')
    const url = 'http://127.0.0.1:5000/tasks/projects_tasks'
    const body = {proj_id: projectId}
    const config = methodPost(body)

    const {result, error} = await useFetch(url, config)
    
    if (error) {
        console.error("Erro ao buscar tarefas do projeto:", error)
        return
    }
    
    renderTasks(pending, result.pending)
    renderTasks(progress, result.progress)
    renderTasks(finished, result.finished)
}

function renderTasks(element, tasks){
    element.innerHTML=``
    tasks.forEach((task) => {
            const card = document.createElement('div');
            const date = formatDate(task.limit_date)

            card.id = `${task.id}`
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
            card.setAttribute('draggable', 'true');
            element.appendChild(card);
})

    const cards = document.querySelectorAll('.task-card')
    const columns = document.querySelectorAll('.kaban-column')
   

    let draggedCard

    cards.forEach((card) => {
        card.addEventListener('dragstart', (event) => {
            draggedCard = event.target
        })
    })

    columns.forEach((column) => {
        const kanbanContent = column.querySelector('.kanban-content')

        column.addEventListener('dragover', (event) => {
            event.preventDefault()
        })


        column.addEventListener('dragenter', (event) => {
            console.log('entrouuuuu')
            event.preventDefault()
            column.classList.add('collumn-highlight')
        })

        column.addEventListener('dragleave', (event) => {
            if (!column.contains(event.relatedTarget)){
                column.classList.remove('collumn-highlight')
            }
        })

        kanbanContent.addEventListener('drop', (event) => {
             event.preventDefault()

            if (draggedCard){
                kanbanContent.appendChild(draggedCard)
                column.classList.remove('collumn-highlight')
                
                const newStatus = status[kanbanContent.id]
                updateTaskStatus(draggedCard.id, newStatus)
            }

            draggedCard = null
        })

    })
}

async function updateTaskStatus(task_id, status){
    const pending = document.getElementById('kanban-pending')
    const url = 'http://127.0.0.1:5000/tasks/update_task_status'
    const body = {task_id: task_id, status: status}
    const config = methodPost(body)

    const {result, error} = await useFetch(url, config)
}