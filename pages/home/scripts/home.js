import { getAllSectors, getCompanies } from "../../../request.js";

const allSectors = await getAllSectors()
const companies = async (sector = '') => await getCompanies(sector)
const select = document.querySelector('.select')




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



function insertSelectOptions () {
    allSectors.forEach((sector) => {
        let option = document.createElement('option')
        option.value = sector.description
        option.innerText = sector.description

        select.appendChild(option)
    })
}
insertSelectOptions()



async function createCompaniesList () {
    const allCompanies = await companies()
    const ulMainList = document.querySelector('.main-list')
    
    allCompanies.forEach((company) => {
        ulMainList.appendChild(renderList(company))
    })
    
    select.addEventListener('click', async () => {
        ulMainList.innerHTML = ''

        if (select.value == "null") {
            (await companies()).forEach((company) => {
                ulMainList.appendChild(renderList(company))
            })
            
        } else {
            (await companies(select.value)).forEach((company) => {
                ulMainList.appendChild(renderList(company))
            })
        }
    })
}
createCompaniesList()


function renderList(obj) {
    
    let liCompany = document.createElement('li')
    liCompany.insertAdjacentHTML('beforeend', `
        <h2>${obj.name}</h2>
        <small>${obj.opening_hours}</small>
        <small class="kind">${obj.sectors.description}</small>
    `)

    return liCompany
}