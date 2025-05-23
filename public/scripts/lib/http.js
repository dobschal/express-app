export async function loadHtml(url) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.text()
}

export async function postRequest(url, formData) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
    })
}
