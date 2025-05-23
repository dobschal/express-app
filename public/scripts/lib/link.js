import {updateDom} from './dom.js'
import {loadHtml} from './http.js'

export function handleLinks() {
    const links = document.querySelectorAll('a')
    links.forEach((link) => {
        catchLinkClick(link)
    })
}

function catchLinkClick(linkElement) {

    async function onLinkClick(event) {
        event.preventDefault()
        const html = await loadHtml(href)
        updateDom(html)
        const newUrl = new URL(href, window.location.origin)
        window.history.pushState({}, '', newUrl)
    }

    const href = linkElement.getAttribute('href')
    if (href.startsWith('http')) {
        return
    }
    linkElement.onclick = onLinkClick
}
