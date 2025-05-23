export class BadRequestError extends Error {
    statusCode = 400
    message = 'Bad Request'
    constructor(message) {
        super(message)
        this.message = message
    }
}
