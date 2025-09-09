import { methodPost } from '../utils/methods.js'
import { useFetch } from '../utils/useFetch.js'
import { formatDate } from '../utils/helpers.js'

const status = {
    'kanban-pending': 'pending',
    'kanban-progress': 'progress',
    'kanban-finished': 'finished'
}

let draggedCard

export async function renderKanban(projectId, title, percent, total_task) {
    const pending = document.getElementById('kanban-pending')
    const finished = document.getElementById('kanban-finished')
    const progress = document.getElementById('kanban-progress')

    document.querySelector('.project-title').textContent = title;
    document.querySelector('#progress-text').textContent = `${percent}%`;
    document.querySelector('.progress-bar').style.width = percent + '%';
    document.querySelector('#total-tasks').textContent = `${total_task} tarefas`;

    const url = 'http://127.0.0.1:5000/tasks/projects_tasks'
    const body = { proj_id: projectId }
    const config = methodPost(body)

    const { result, error } = await useFetch(url, config)

    if (error) {
        console.error("Erro ao buscar tarefas do projeto:", error)
        return
    }

    // Renderiza as tasks de cada coluna
    renderTasks(pending, result.pending)
    renderTasks(progress, result.progress)
    renderTasks(finished, result.finished)

    // Configura drag and drop
    setupDragAndDrop()
    setupButtons(projectId) 
}

// ----------------------------
// Renderiza tasks dentro da coluna
// ----------------------------
function renderTasks(element, tasks) {
    element.innerHTML = ``

    tasks.forEach((task) => {
        const card = document.createElement('div')
        const date = formatDate(task.limit_date)

        card.id = `${task.id}`
        card.innerHTML = `
            <div class="date-task">
                <p class="barlow-regular">${date}</p>
            </div>
            
            <div>
                <p class="barlow-regular">${task.description}</p>
            </div>
        `

        card.classList.add('task-card')
        card.style.borderColor = `#${task.proj_color}`
        card.setAttribute('draggable', 'true')

        element.appendChild(card)
    })
}

// ----------------------------
// Configura criação de cards pelos botões
// ----------------------------
function setupButtons(proj_id) {
    const buttons = document.querySelectorAll('.kaban-button')

    const createCard = ({ target }) => {
        const card = document.createElement('div')
        card.classList.add('task-card')
        card.setAttribute('contenteditable', 'true')
        
        card.setAttribute('draggable', 'true')
        const button = target.closest('.kaban-button')
        const column = button.closest('.kaban-column')
        const content = column.querySelector('.kanban-content')

        card.addEventListener('focusout', () => {
            card.contentEditable = "false"
            if (!card.textContent){
                card.remove()
            }else {
                const taskStatus = status[content.id]
                const description = card.textContent
                createTask(proj_id, description, taskStatus, '2025-09-06')
            }
        })

        content.appendChild(card)
        card.focus()
        card.addEventListener('dragstart', (event) => {
            draggedCard = event.target
        })
    }

    buttons.forEach((button) => {
        button.addEventListener('click', createCard)
    })
}

function setupDragAndDrop() {
    const cards = document.querySelectorAll('.task-card')
    const columns = document.querySelectorAll('.kaban-column')

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
            event.preventDefault()
            column.classList.add('collumn-highlight')
        })

        column.addEventListener('dragleave', (event) => {
            if (!column.contains(event.relatedTarget)) {
                column.classList.remove('collumn-highlight')
            }
        })

        kanbanContent.addEventListener('drop', (event) => {
            event.preventDefault()
            if (draggedCard) {
                kanbanContent.appendChild(draggedCard)
                column.classList.remove('collumn-highlight')

                const newStatus = status[kanbanContent.id]
                updateTaskStatus(draggedCard.id, newStatus)
            }
            draggedCard = null
        })
    })
}

// ----------------------------
// Atualiza status da task no backend
// ----------------------------
async function updateTaskStatus(task_id, status) {
    const url = 'http://127.0.0.1:5000/tasks/update_task_status'
    const body = { task_id: task_id, status: status }
    const config = methodPost(body)

    const { result, error } = await useFetch(url, config)
    if (error) {
        console.log(error)
    }
}

async function createTask(proj_id, description, status, date) {
    const url = 'http://127.0.0.1:5000/tasks/create_task'
    const body = { proj_id: proj_id, description: description, status: status, limit_date: date }
    const config = methodPost(body)

    const { result, error } = await useFetch(url, config)
    if (error) {
        console.log(error)
    }
}
