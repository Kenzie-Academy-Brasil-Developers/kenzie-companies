

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