import { NotFoundError } from '@sgticket1thuan/common'
import express ,{ Request, Response} from 'express'
import { Game } from '../models/game'

const router = express.Router()

router.get('/api/games/:id',async (req: Request, res: Response) =>{
   const game = await Game.findById(req.params.id)

   if(!game){
       throw new NotFoundError()
   }

    res.send(game)
})

export { router as showGameRouter }