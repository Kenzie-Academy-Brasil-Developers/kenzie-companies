const baseUrl = 'http://localhost:6278'


export async function getAllSectors () {
    const requestAllSectors = await fetch(`${baseUrl}/sectors`, {
        method: 'GET'
    })
    const responseAllSectors = await requestAllSectors.json()

    return responseAllSectors
}


export async function getCompanies (sector) {
    const requestAllCompanies = await fetch(`${baseUrl}/companies/${sector}`, {
        method: 'GET'
    })
    const responseAllCompanies = await requestAllCompanies.json()

    return responseAllCompanies
}


export async function typeOfUser (token) {
    const requestUserType = await fetch(`${baseUrl}/auth/validate_user`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseUserType = await requestUserType.json()

    return responseUserType.is_admin
}


export async function login (body) {
    try{
        const requestLogin = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const responseLogin = await requestLogin.json()


        if (responseLogin.error == 'email invalid!') {
            throw new Error('E-mail inválido')
        } else if (responseLogin.error == 'password invalid!') {
            throw new Error('Senha inválida')
        }

        
        if (requestLogin.ok && await typeOfUser(responseLogin.token)) {
            localStorage.setItem('userToken', responseLogin.token)
            location.assign('../admin/admin.html')
            
        } else if (requestLogin.ok && !(await typeOfUser(responseLogin.token))) {
            localStorage.setItem('userToken', responseLogin.token)
            location.assign('../user/user.html')
        }

    }
    catch(error) {
        const spanError = document.querySelector('.error')
        spanError.innerText = error.message
        spanError.style.display = 'inline-block'
    }
}


export async function register (body) {
    const requestRegister = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    
    if (requestRegister.ok) {
        location.replace('../login/login.html')
    }
}


export async function getUserInfo (token) {
    const requestUserInfo = await fetch(`${baseUrl}/users/profile`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseUserInfo = await requestUserInfo.json()

    return responseUserInfo
}


export async function updateUserInfo (token) {
    const requestRegister = await fetch(`${baseUrl}/users`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}


export async function getUserCompanyInfo (token) {
    const requestCompanyInfo = await fetch(`${baseUrl}/users/departments`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseCompanyInfo = await requestCompanyInfo.json()

    return responseCompanyInfo
}


export async function getUserDepartmentInfo (token) {
    const requestDepartmentInfo = await fetch(`${baseUrl}/users/departments/coworkers`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseDepartmentInfo = await requestDepartmentInfo.json()

    return responseDepartmentInfo
}