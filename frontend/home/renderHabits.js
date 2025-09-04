import {useFetch} from'../utils/useFetch.js'
import {methodPost} from '../utils/methods.js'
export function renderHabits(todayHabits){
    const container = document.querySelector('.today-habits')
    container.innerHTML=``
    todayHabits.forEach((habit) => {
        
        const habitCard = document.createElement('div')
        habitCard.classList.add('state-container')
        const isCompleted = habit.is_active === 0;

        if (isCompleted){
            habitCard.classList.add('completed')
        }

        const img = `../statics/img/${habit.image}`

        habitCard.innerHTML=`
        <div class="image-back">
            <img class="habit-image" src="${img}"/>
        </div>
        <div class="infos">
            <div class="text-infos">
                <p class="title barlow-semibold">${habit.name}</p>
            </div>
            <div class="to-do">
                <div class="type-habit">
                    <p class="barlow-regular type-habit-text">${habit.type}</p>
                </div>
                <div class="checkbox-container">
                    <input type="checkbox" id="habit-checkbox-${habit.habit_id}" ${isCompleted ? 'checked' : ''}">
                    <label for="habit-checkbox-${habit.habit_id}"></label>
                </div>
            </div>
                
        </div>
        
        `
        
        container.appendChild(habitCard)

        const checkId = `habit-checkbox-${habit.habit_id}`
        const check = document.getElementById(checkId)
        if (habit.is_active === 0){
            check.checked = true;
        }
        check.addEventListener('change', (event) => {
            const clickedCheck = event.target;
            const card = clickedCheck.closest('.state-container')

            if(clickedCheck.checked){
                card.classList.add('completed')
                updateHabit(habit.habit_id, 0)
            }else {
                card.classList.remove('completed')
                updateHabit(habit.habit_id, 1)
            }
        })
    })
    
}

async function updateHabit(habitId, status){
    const url = 'http://127.0.0.1:5000/tasks/update_active_habits'
    const body = {habit_id: habitId, status: status}
    const config = methodPost(body)
    const {result, error} = useFetch(url, config)
}