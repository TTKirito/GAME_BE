import mongoose, { version } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface GameAttrs {
    name: string,
    provider: string,
    title: string,
    genre: string,
}

interface GameDoc extends mongoose.Document{
    title: string,
    price: number,
    userId: string,
    version: number,
    orderId?:string,
    image?: Buffer,
}

interface GameModel extends mongoose.Model<GameDoc>{
    build(attrs: GameAttrs): GameDoc
}

const GameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    provider:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id
            delete ret._id
        }
    },timestamps: true
})
GameSchema.plugin(updateIfCurrentPlugin)
GameSchema.set('versionKey','version')


GameSchema.statics.build = (attrs: GameAttrs) => {
    return new Game(attrs)
}

const Game = mongoose.model<GameDoc,GameModel>('Game',GameSchema)
export { Game }