export function renderTodayTasks(tasksToday){
    
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