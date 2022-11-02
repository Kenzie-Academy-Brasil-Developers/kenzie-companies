import { typeOfUser } from "../../../request.js"


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