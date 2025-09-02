import { useFetch } from '../utils/useFetch.js'
import { methodGet } from '../utils/methods.js'
import { renderHabits } from './renderHabits.js'
import { renderRecentProjects } from './renderRecentProjects.js'
import { renderTodayTasks } from './renderTodayTasks.js'

export async function renderHome(){
    const url = 'http://127.0.0.1:5000/tasks/home'
    const config = methodGet()

    const {result, error} = await useFetch(url, config)

    const recentProjects = result.recent_projects;
    const tasksToday = result.tasks_today;
    const todayHabits = result.habits_today;

    renderHabits(todayHabits)
    renderTodayTasks(tasksToday)
    renderRecentProjects(recentProjects)
}