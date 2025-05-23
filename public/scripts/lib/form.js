import {updateDom} from './dom.js'
import {showError} from './error.js'
import {postRequest} from './http.js'

export function handleForms() {
    const forms = document.querySelectorAll('form')
    forms.forEach((form) => {
        catchFormSubmit(form)
    })
}

function catchFormSubmit(formElement) {

    async function onFormSubmit(event) {
        event.preventDefault()
        formElement.classList.add('loading')
        const formData = new FormData(formElement)
        const url = formElement.getAttribute('action')
        const response = await postRequest(url, formData)
        if (!response.ok) {
            const responseJson = await response.json()
            return showError(responseJson.error)
        }
        const html = await response.text()
        formElement.classList.remove('loading')
        updateDom(html)
    }

    formElement.onsubmit = onFormSubmit
}
