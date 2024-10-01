import { requestValidate } from '@sgticket1thuan/common'
import express ,{ Request, Response} from 'express'
import { body } from 'express-validator'
import { Game } from '../models/game'

const router = express.Router()

router.post('/api/games',
[
    body('name')
        .not()
        .isEmpty()
        .withMessage('name must be required'),
    body('provider')
        .not()
        .isEmpty()
        .withMessage('provider must be required'),
    body('title')
        .not()
        .isEmpty()
        .withMessage('title must be required'),
    body('genre')
        .not()
        .isEmpty()
        .withMessage('genre must be required'),
],
requestValidate,
async (req: Request, res: Response) =>{
    const { name, provider, title, genre } = req.body
    const game = Game.build({
        provider,
        title,
        genre,
        name,
    })

    await game.save()
    res.status(201).send(game)
})

export { router as createGameRouter }