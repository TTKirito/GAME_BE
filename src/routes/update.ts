import { NotFoundError, requestValidate } from '@sgticket1thuan/common'
import express ,{ Request, Response} from 'express'
import { body } from 'express-validator'
import { Game } from '../models/game'

const router = express.Router()

router.put('/api/games/:id',[
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
    const game = await Game.findById(req.params.id)

    if(!game){
        throw new NotFoundError()
    }

    game.set({
        title: req.body.title,
        name: req.body.name,
        provider: req.body.provider,
        genre: req.body.genre
    })
    await game.save()

    res.send(game)
})

export { router as updateGameRouter }