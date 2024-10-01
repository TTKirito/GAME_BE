import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import 'express-async-errors'
import { errorHandler, NotFoundError } from '@sgticket1thuan/common'
import { deleteGameRouter } from './routes/delete'
import { indexGameRouter } from './routes'
import { createGameRouter } from './routes/new'
import { showGameRouter } from './routes/show'
import { updateGameRouter } from './routes/update'

const app = express()
app.set('trust proxy', true)
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(deleteGameRouter)
app.use(indexGameRouter)
app.use(createGameRouter)
app.use(showGameRouter)
app.use(updateGameRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})


app.use(errorHandler)

export {app}