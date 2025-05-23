import {handleLinks} from './link.js'
import {handleForms} from './form.js'

export function updateDom(html) {
    const parser = new DOMParser()
    const newDoc = parser.parseFromString(html, 'text/html')
    const newBody = newDoc.body

    updateChildElements(document.body, newBody)
    updateTitle(newDoc)

    handleLinks()
    handleForms()
}

function updateTitle(newDoc) {
    const newTitle = newDoc.querySelector('title')
    if (newTitle) {
        document.title = newTitle.innerText
    }
}

function updateChildElements(oldElement, newElement) {
    const oldChildren = Array.from(oldElement.children)
    const newChildren = Array.from(newElement.children)

    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        const oldChild = oldChildren[i]

        if (!oldChild) {
            oldElement.appendChild(newChild)
            continue
        }

        if (newChild.isEqualNode(oldChild)) {
            continue
        }

        const hasChildren = newChild.children.length > 0
        if (!hasChildren || oldChild.tagName !== newChild.tagName) {
            oldElement.replaceChild(newChild, oldChild)
            continue
        }
        if (hasChildren) {
            updateChildElements(oldChild, newChild)
        }
        updateAttributes(oldChild, newChild)
    }
}

function updateAttributes(oldElement, newElement) {
    const oldAttributes = Array.from(oldElement.attributes)
    const newAttributes = Array.from(newElement.attributes)

    for (const attr of oldAttributes) {
        if (!newElement.hasAttribute(attr.name)) {
            oldElement.removeAttribute(attr.name)
        }
    }

    for (const attr of newAttributes) {
        oldElement.setAttribute(attr.name, attr.value)
    }
}
