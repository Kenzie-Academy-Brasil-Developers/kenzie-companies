import { typeOfUser, getAllDepartments, getCompanies, getAllUsers } from "../../../request.js"
import { createEditUserModal, createDeleteUserModal } from "./modalsAdmin.js"


const selectCompanies   = document.querySelector('#selectCompanies')

const userToken = localStorage.getItem('userToken')


if (!userToken) {
    location.replace('/index.html')
}

if (!(await typeOfUser(userToken))) {
    location.replace('/pages/user/user.html')
}


function logoutToken() {
    const buttonLogout = document.querySelector('.logout')
    buttonLogout.addEventListener('click', () => {
        localStorage.removeItem('userToken')
    })
}
logoutToken()


async function insertOptionValues () {
    (await getCompanies('')).forEach((company) => {
        let option = document.createElement('option')
        option.value = company.uuid
        option.innerText = company.name

        selectCompanies.appendChild(option)
    })
}
insertOptionValues()


async function renderDepartmentsList () {
    const ulDepartmentsList = document.querySelector('#departmentsList')

    let departments = await getAllDepartments(userToken)

    departments.forEach((department) => {
        ulDepartmentsList.appendChild(createDepartmentList(department))
        
    })


    selectCompanies.addEventListener('click', async () => {
        ulDepartmentsList.innerHTML = ''

        if (selectCompanies.value == 'null') {
            departments.forEach((department) => {
                ulDepartmentsList.appendChild(createDepartmentList(department))
            })
            
        } else {
            (await getAllDepartments(userToken, selectCompanies.value)).forEach((department) => {
                ulDepartmentsList.appendChild(createDepartmentList(department))
            })
        }
    })
    
}
renderDepartmentsList()


function createDepartmentList (obj) {
    let li = document.createElement('li')
    li.insertAdjacentHTML('afterbegin', `
        <h3>${obj.name}</h3>
        <small>${obj.description}</small>
        <small>${obj.companies.name}</small>
        <div>
            <img src="/img/home/eye-icon.svg" alt="Ver Departamento">
            <img src="/img/home/edit-icon-black.svg" alt="Editar Departamento">
            <img src="/img/home/trash-icon.svg" alt="Excluir Departamento">
        </div>
    `)
    return li
}


export async function renderUsersList () {
    const ulUsersList = document.querySelector('#usersList')
    ulUsersList.innerHTML = ''
    
    let allUsers = (await getAllUsers(userToken)).filter((user) => !user.is_admin)
    
    allUsers.forEach(async (user) => {
        let li = await createUserli(user)
        ulUsersList.appendChild(li)
    })

}
renderUsersList()


async function createUserli(obj) {
    let username = obj.username.split('')
    username[0] = username[0].toUpperCase()
    username = username.join('')
    
    let proLevel = ''
    if (obj.professional_level) {
        proLevel = obj.professional_level.split('')
        proLevel[0] = proLevel[0].toUpperCase()
        proLevel = proLevel.join('')
    }
    
    let li = document.createElement('li')
    li.id = obj.uuid

    let h3UserName = document.createElement('h3')
    h3UserName.innerText = username
    
    let smallProLevel = document.createElement('small')
    smallProLevel.innerText = proLevel
    
    let smallWorkFor = document.createElement('small')
    if (obj.department_uuid) {
        let allDepartments = await getAllDepartments(userToken)
        let department = allDepartments.find((department) => department.uuid == obj.department_uuid)

        smallWorkFor.innerText = department.companies.name

    } else {
        smallWorkFor.innerText = 'Ainda não contratado'

    }

    let divIcons = document.createElement('div')

    let imgEditIcon = document.createElement('img')
    imgEditIcon.className = 'edit-user-icon'
    imgEditIcon.src = '/img/home/edit-icon-blue.svg'
    imgEditIcon.alt = 'Editar informações do usuário'

    imgEditIcon.addEventListener('click', () => {
        createEditUserModal(li.id)
    })
    
    let imgDeleteIcon = document.createElement('img')
    imgDeleteIcon.className = 'delete-user-icon'
    imgDeleteIcon.src = '/img/home/trash-icon.svg'
    imgDeleteIcon.alt = 'Excluir usuário'

    imgDeleteIcon.addEventListener('click', () => {
        createDeleteUserModal(username, li.id)
    })
    
    divIcons.append(imgEditIcon, imgDeleteIcon)
    li.append(h3UserName, smallProLevel, smallWorkFor, divIcons)
    
    return li
}