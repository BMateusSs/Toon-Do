import { renderHome } from './renderHome.js'
import { renderProjects } from './renderProjects.js'

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.menu-button')
    const pages = document.querySelectorAll('.content-block')

    const pagesFunction = {
        'home': renderHome,
        'projects': renderProjects
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((btn) => {
                btn.classList.remove('active')
            })
            button.classList.add('active')

            const pageId = button.getAttribute('data-page')

            pages.forEach((page) => {
            page.classList.remove('active-content')
        })

        const currentPage = document.getElementById(pageId)

        currentPage.classList.add('active-content')
        if (pagesFunction[pageId]) {
            pagesFunction[pageId]();
        }
        
        })

    })

    document.getElementById('home').classList.add('active-content')
    pagesFunction['home']()
})