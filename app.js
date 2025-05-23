import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import bodyParser from 'body-parser'
import {usersRouter} from './routes/users.js'
import index from './routes/index.js'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(expressLayouts)
app.set('layout', './layouts/default')
app.set('view engine', 'ejs')

app.use('/users', usersRouter)
app.use('/', index)

app.use((err, req, res, next) => {
    console.error('Error: ', err.stack)
    res.status(err?.statusCode ?? 500).send({error: err.message})
    next()
})

app.listen(port, () => {
    console.log(` ⚡️ Application started on port ${port}.`)
})

