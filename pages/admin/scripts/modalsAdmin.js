import { getCompanies, createDepartment, editDepartment, deleteDepartment, editUserInfo, deleteUser } from "../../../request.js";
import { renderDepartmentsList, renderUsersList } from "./admin.js";

const userToken = localStorage.getItem('userToken')

function createNewDepartmentModal () {
    const newDepartmentButton = document.querySelector('#newDepartment')
    newDepartmentButton.addEventListener('click', async () => {

        let divModalCreate               = document.createElement('div')
        let sectionModalCreate           = document.createElement('section')
        let spanCloseModal             = document.createElement('span')
        let h2ModalTitle               = document.createElement('h2')
        let formCreate                   = document.createElement('form')
        let inputDepartmentName        = document.createElement('input')
        let inputDepartmentDescription = document.createElement('input')
        let selectCompany              = document.createElement('select')
        let buttonSubmit               = document.createElement('button')

    
        divModalCreate.className = 'modal-bg'
        sectionModalCreate.classList = 'modal modal-edit'
        spanCloseModal.innerText   = 'X'
        spanCloseModal.addEventListener('click', () => {divModalCreate.remove()})
        h2ModalTitle.innerText     = 'Criar Departamento'
        inputDepartmentName.type = 'text'
        inputDepartmentName.placeholder = 'Nome do departamento'
        inputDepartmentName.required = true
        inputDepartmentDescription.type = 'text'
        inputDepartmentDescription.placeholder = 'Descrição'
        inputDepartmentDescription.required = true
        selectCompany.className = 'default'

        selectCompany.insertAdjacentHTML('afterbegin', `
            <option value="null">Selecionar empresa</option>
        `)

        let allCompanies = await getCompanies('')
        
        allCompanies.forEach((company) => {
            let option = document.createElement('option')
            option.value = company.uuid
            option.innerText = company.name

            selectCompany.appendChild(option)
        })

        buttonSubmit.type = 'submit'
        buttonSubmit.innerText = 'Criar o departamento'

        formCreate.addEventListener('submit', async (event) => {
            event.preventDefault()

            let newDepartmentBody = {
                name: inputDepartmentName.value,
                description: inputDepartmentDescription.value,
                company_uuid: selectCompany.value
            }

            await createDepartment(userToken, newDepartmentBody)

            await renderDepartmentsList()
            divModalCreate.remove()
        })
    
        formCreate.append(inputDepartmentName, inputDepartmentDescription, selectCompany, buttonSubmit)
        sectionModalCreate.append(spanCloseModal, h2ModalTitle, formCreate)
        divModalCreate.appendChild(sectionModalCreate)
        document.body.appendChild(divModalCreate)
    })
    

}
createNewDepartmentModal()


export function createEditDepartmentModal (department, departmentId) {
    let divModalEdit = document.createElement('div')
    let sectionModalEdit = document.createElement('section')
    let spanCloseModal   = document.createElement('span')
    let h2ModalTitle     = document.createElement('h2')
    let formEdit         = document.createElement('form')

    divModalEdit.className = 'modal-bg'
    sectionModalEdit.classList = 'modal modal-edit'
    spanCloseModal.innerText   = 'X'
    spanCloseModal.addEventListener('click', () => {divModalEdit.remove()})
    h2ModalTitle.innerText     = 'Editar Departamento'
    formEdit.insertAdjacentHTML('afterbegin', `
        <input type="text" placeholder="Descrição">
        <button type="submit">Salvar Alterações</button>
    `)

    formEdit.elements[0].value = department.description
    
    formEdit.addEventListener('submit', async (event) => {
        event.preventDefault()

        let editedDescription = formEdit.elements[0].value

        let editedDepartmentBody = {
            description: editedDescription
        }
        await editDepartment(userToken, editedDepartmentBody, departmentId)

        await renderDepartmentsList()
        divModalEdit.remove()

    })
    
    sectionModalEdit.append(spanCloseModal, h2ModalTitle, formEdit)
    divModalEdit.appendChild(sectionModalEdit)
    document.body.appendChild(divModalEdit)
}


export function createDeleteDepartmentModal (departmentName, departmentId) {
    let divModalDelete     = document.createElement('div')
    let sectionModalDelete = document.createElement('section')
    let spanCloseModal     = document.createElement('span')
    let pMessage           = document.createElement('p')
    let buttonDelete       = document.createElement('button')

    divModalDelete.className = 'modal-bg'
    sectionModalDelete.classList = 'modal modal-delete'
    spanCloseModal.innerText = 'X'
    spanCloseModal.addEventListener('click', () => { divModalDelete.remove() })
    pMessage.innerText = `Realmente deseja deletar o Departamento de ${departmentName} e demitir seus funcionários?`
    buttonDelete.innerText = 'Deletar'
    buttonDelete.addEventListener('click', async () => {
        await deleteDepartment(userToken, departmentId)

        await renderDepartmentsList()
        divModalDelete.remove()
    })

    sectionModalDelete.append(spanCloseModal, pMessage, buttonDelete)
    divModalDelete.appendChild(sectionModalDelete)
    document.body.appendChild(divModalDelete)
}


export function createEditUserModal (userId) {
    let divModalEditUser = document.createElement('div')
    let sectionModalEdit = document.createElement('section')
    let spanCloseModal   = document.createElement('span')
    let h2ModalTitle     = document.createElement('h2')
    let formEdit         = document.createElement('form')

    divModalEditUser.className = 'modal-bg'
    sectionModalEdit.classList = 'modal modal-edit'
    spanCloseModal.className   = 'close-modal'
    spanCloseModal.innerText   = 'X'
    spanCloseModal.addEventListener('click', () => {divModalEditUser.remove()})
    h2ModalTitle.innerText     = 'Editar Usuário'

    formEdit.insertAdjacentHTML('afterbegin', `
        <form>
            <select id="select" class="default">
                <option value="null">Selecionar modalidade de trabalho </option>
                <option value="presencial">Presencial</option>
                <option value="home office">Home Office</option>
                <option value="hibrido">Híbrido</option>
            </select>

            <select class="default">
                <option value="null">Selecionar nível profissional</option>
                <option value="estágio">Estagiário</option>
                <option value="júnior">Junior</option>
                <option value="pleno">Pleno</option>
                <option value="sênior">Sênior</option>
            </select>
            <button type="submit">Editar</button>
        </form>
    `)
    
    formEdit.addEventListener('submit', async (event) => {
        event.preventDefault()
        let editedUserBody = {}

        let editedKindOfWork = formEdit.elements[0].value
        let editedProLevel   = formEdit.elements[1].value

        editedUserBody = {
            kind_of_work: editedKindOfWork,
	        professional_level: editedProLevel
        }

        await editUserInfo(userToken, editedUserBody, userId)

        await renderUsersList()
        divModalEditUser.remove()
    })
    
    sectionModalEdit.append(spanCloseModal, h2ModalTitle, formEdit)
    divModalEditUser.appendChild(sectionModalEdit)
    document.body.appendChild(divModalEditUser)
     
}


export function createDeleteUserModal (userName, userId) {
    let divModalDeleteUser = document.createElement('div')
    let sectionModalDelete = document.createElement('section')
    let spanCloseModal     = document.createElement('span')
    let pMessage           = document.createElement('p')
    let buttonDelete       = document.createElement('button')


    divModalDeleteUser.className = 'modal-bg'
    sectionModalDelete.classList = 'modal modal-delete'
    spanCloseModal.innerText = 'X'
    spanCloseModal.addEventListener('click', () => { divModalDeleteUser.remove() })
    pMessage.innerText = `Realmente deseja remover o usuário ${userName}?`
    buttonDelete.innerText = 'Deletar'

    buttonDelete.addEventListener('click', async () => {
        await deleteUser(userToken, userId)

        await renderUsersList()
        divModalDeleteUser.remove()
    })


    sectionModalDelete.append(spanCloseModal, pMessage, buttonDelete)
    divModalDeleteUser.appendChild(sectionModalDelete)
    document.body.appendChild(divModalDeleteUser)
}