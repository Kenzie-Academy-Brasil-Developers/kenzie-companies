import { getUserInfo, getUserCompanyInfo, getUserDepartmentInfo } from "../../../request.js";
const userToken = localStorage.getItem('userToken')


if (!userToken) {
    location.replace('/index.html')
}


function logoutToken() {
    const buttonLogout = document.querySelector('.logout')
    buttonLogout.addEventListener('click', () => {
        localStorage.removeItem('userToken')
    })
}
logoutToken()


async function renderUserInfo () {
    let { username, email, professional_level, kind_of_work } = await getUserInfo(userToken)

    let proLevel = professional_level.split('')
    proLevel[0] = proLevel[0].toUpperCase()
    proLevel = proLevel.join('')

    
    const divUserInfo = document.querySelector('.user-info')
    divUserInfo.insertAdjacentHTML('afterbegin', `
        <div>
            <h1>${(username).toUpperCase()}</h1>
            <div>
                <small>Email: ${email}</small>
                <small>${proLevel}</small>
                <small id="kindOfWork"></small>
            </div>
        </div>
        <img id="editUserInfo" src="/img/home/edit-icon-blue.svg" alt="Editar Perfil">
    `)

    let smallKindOfWork = document.querySelector('#kindOfWork')

    if (kind_of_work) {
        let kindOfWork = kind_of_work.split('')
        kindOfWork[0] = kindOfWork[0].toUpperCase()
        kindOfWork = kindOfWork.join('')

        smallKindOfWork.innerText = kindOfWork
    }

    
    let imgEditIcon = document.querySelector('#editUserInfo')
    createModalEdit(imgEditIcon)
    
}
renderUserInfo()


function createModalEdit (icon) {
    icon.addEventListener('click', () => {
        let divModal = document.createElement('div')
        divModal.className = 'modal-bg'
        divModal.insertAdjacentHTML('afterbegin', `
            <section class="modal modal-edit">
                <span class="close-modal">X</span>
                <h2>Editar Perfil</h2>
                <form>
                    <input type="text" placeholder="Seu nome">
                    <input type="text" placeholder="Seu e-mail">
                    <input type="password" placeholder="Sua senha">
                    <button type="submit">Editar perfil</button>
                </form>
            </section>
        `)
        document.body.appendChild(divModal)
    })
}


async function renderDepartmentInfo () {
    let {department_uuid} = await getUserInfo(userToken)
    
    if (department_uuid) {
        let companyInfo = await getUserCompanyInfo(userToken)
        let userDepartmentInfo = await getUserDepartmentInfo(userToken)

        let divMain = document.querySelector('.main-empty')
        divMain.classList.remove('main-empty')
        divMain.classList.add('main')
        divMain.innerHTML = ''
        
        let h2CompanyTitle = document.createElement('h2')
        h2CompanyTitle.classList.add('company-title')
        h2CompanyTitle.innerText = `${companyInfo.name} - ${userDepartmentInfo[0].name}`
        
        let ulCoworkersList = document.createElement('ul')

        // console.log(userDepartmentInfo[0].users)

        userDepartmentInfo[0].users.forEach((coworker) => {
            let proLevel = coworker.professional_level.split('')
            proLevel[0] = proLevel[0].toUpperCase()
            proLevel = proLevel.join('')

            let coworkerName = coworker.username.split('')
            coworkerName[0] = coworkerName[0].toUpperCase()
            coworkerName = coworkerName.join('')
            
            let liCoworkerInfo = document.createElement('li')

            let h3CoworkersName = document.createElement('h3')
            h3CoworkersName.innerText = `${coworkerName}`
            
            let smallCoworkerProLevel = document.createElement('small')
            smallCoworkerProLevel.innerText = `${proLevel}`

            liCoworkerInfo.append(h3CoworkersName, smallCoworkerProLevel)
            ulCoworkersList.appendChild(liCoworkerInfo)
        })

        divMain.append(h2CompanyTitle, ulCoworkersList)
    }
}
renderDepartmentInfo()