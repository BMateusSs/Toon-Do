import { methodPost } from '../utils/methods.js'
import { useFetch } from '../utils/useFetch.js'
import { formatDate } from '../utils/helpers.js'

export async function renderKanban(projectId = 4){  
    const pending = document.getElementById('kanban-pending')
    const url = 'http://127.0.0.1:5000/tasks/projects_tasks'
    const body = {proj_id: projectId}
    const config = methodPost(body)

    const {result, error} = await useFetch(url, config)
    
    if (error) {
        console.error("Erro ao buscar tarefas do projeto:", error)
        return
    }
    
    renderTasks(pending, result.pending)
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

    const dragStart = (event) => {
        draggedCard = event.target
        event.dataTransfer.effectAllowed = "move"
    } 

    const draggedOver = (event) => {
        event.preventDefault()

    }

    const dragEnter = ({target}) => {
        if (target.classList.contains('kanban-content')){
            target.classList.add('collumn-highlight')
        }
        
        console.log('entrou')
    }

    const dragLeave = ({target}) => {
        target.classList.remove('collumn-highlight')
    }

    const drop = ({target}) => {
        if (target.classList.contains('kanban-content')){
            target.appendChild(draggedCard)
        }
        
    }

    cards.forEach((card) => {
        card.addEventListener('dragstart', dragStart)
    })


    columns.forEach((column) => {
        column.addEventListener('dragover', draggedOver)
        column.addEventListener('dragenter', dragEnter)
        column.addEventListener('dragleave', dragLeave)
        column.addEventListener('drop', drop)
    })
}