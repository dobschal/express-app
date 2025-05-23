import {BadRequestError} from './errors/BadRequestError.js'
import {Router} from 'express'
import db from '../database/database.js'

export const usersRouter = Router()

usersRouter.get('/', (req, res) => {
    res.render('users', {title: 'Users', users: getUsers()})
})

usersRouter.post('/', (req, res) => {
    if (!isNonEmptyString(req.body.name)) {
        throw new BadRequestError('Name is required')
    }
    setTimeout(() => {
        console.log('Simulating a delay')

        db.prepare('INSERT INTO user (name) VALUES (?)').run(req.body.name)
        res.render('users', {title: 'Users', users: getUsers()})
    }, 3000)
})

function isNonEmptyString(val) {
    return !(typeof val !== 'string' || val.trim() === '')
}

function getUsers() {
    return db.prepare('SELECT * FROM user').all()
}
