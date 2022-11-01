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


export async function login (body) {
    try{
        const requestLogin = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const responseLogin = await requestLogin.json()

        console.log(requestLogin, responseLogin)

        if (responseLogin.error == 'email invalid!') {
            throw new Error('E-mail inválido')
        } else if (responseLogin.error == 'password invalid!') {
            throw new Error('Senha inválida')
        }

        if (requestLogin.ok) {
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


// export async function register (body) {

// }