import { renderHabits } from './renderHabits.js'
import { renderRecentProjects } from './renderRecentProjects.js'

export function renderHome(){
    renderHabits()
    // Temporariamente reutilizando renderProjects; idealmente criar renderRecentProjects
    renderRecentProjects()
}