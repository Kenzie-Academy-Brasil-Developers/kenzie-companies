import { register } from "../../../request.js"


function menuDropdown () {
    const divHeader = document.querySelector('.div-header')
    const menuButtons = document.querySelector('.menu-buttons')
    const imgMenuDropdown = document.querySelector('.dropdown')

    imgMenuDropdown.addEventListener('click', () => {
        imgMenuDropdown.remove()

        const imgExit = document.createElement('img')
        imgExit.src = "/img/home/exit-icon.svg"
        imgExit.alt = "Sair do menu"
        imgExit.className = 'exit'

        divHeader.appendChild(imgExit)

        menuButtons.style.display = 'flex'
        
        imgExit.addEventListener('click', () => {
            imgExit.remove()
            divHeader.appendChild(imgMenuDropdown)
            menuButtons.style.display = 'none'
        })
        
    })
}
menuDropdown ()


function registerBody () {
    const formRegister = document.querySelector('.form')
    console.log(formRegister.elements)    
    formRegister.addEventListener('submit', (event) => {
        event.preventDefault()

        let newUser = {}

        let newUserName     = formRegister.elements[0].value
        let newUserEmail    = formRegister.elements[1].value
        let newUserPassword = formRegister.elements[2].value
        let newUserLevel    = formRegister.elements[3].value

        newUser = {
            username: newUserName,
            password: newUserPassword,
            email: newUserEmail,
            professional_level: newUserLevel
        }
        register(newUser)
    })
}
registerBody()