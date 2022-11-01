import { getUserInfo } from "../../../request.js";
const userToken = localStorage.getItem('userToken') || ''

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
        <img src="/img/home/edit-icon-blue.svg" alt="Editar Perfil">
    `)

    let smallKindOfWork = document.querySelector('#kindOfWork')

    if (kind_of_work) {
        let kindOfWork = kind_of_work.split('')
        kindOfWork[0] = kindOfWork[0].toUpperCase()
        kindOfWork = kindOfWork.join('')

        smallKindOfWork.innerText = kindOfWork
    }
}
renderUserInfo()