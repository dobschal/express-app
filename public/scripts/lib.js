import {showFatalError} from './lib/error.js'
import {updateDom} from './lib/dom.js'
import {loadHtml} from './lib/http.js'
import {handleLinks} from './lib/link.js'
import {handleForms} from './lib/form.js'

window.addEventListener('error', function (event) {
    console.error('Error caught:', event)
    showFatalError()
})

window.addEventListener('popstate', async function () {
    const url = window.location.pathname
    const html = await loadHtml(url)
    updateDom(html)
})

handleLinks()
handleForms()

