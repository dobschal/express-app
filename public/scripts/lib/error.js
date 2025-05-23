export function showFatalError() {
    document.querySelector('main').innerHTML = `
        <p><b>Fatal Error:</b> An unexpected error occurred. Please try to reload the page.</p>
    `
}

export function showError(message) {
    document.body.insertAdjacentHTML('beforeend', `
        <div class="alert alert-danger" role="alert">
            <strong>Error:</strong> ${message}
        </div>
    `)
    const alert = document.querySelector('.alert')
    setTimeout(() => {
        alert.remove()
    }, 5000)
}
