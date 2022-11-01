const baseUrl = 'http://localhost:6278'

export async function getAllSectors () {
    const requestAllSectors = await fetch(`${baseUrl}/sectors`)
    const responseAllSectors = await requestAllSectors.json()

    return responseAllSectors
}


export async function getCompanies (sector) {
    const requestAllCompanies = await fetch(`${baseUrl}/companies/${sector}`)
    const responseAllCompanies = await requestAllCompanies.json()

    return responseAllCompanies
}