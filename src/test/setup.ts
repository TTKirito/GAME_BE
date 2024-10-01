import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

jest.setTimeout(30000)

let mongo:any
beforeAll(async ()=>{
    process.env.JWT_KEY = 'thuan'
    process.env.NODE_TLS_EJECT_UNAUTHORIZED = '0'
    mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri()
    await mongoose.connect(mongoUri,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
})

beforeEach(async ()=>{
    jest.clearAllMocks()
    const collections = await mongoose.connection.db.collections()
    for(let collection of collections){
        await collection.deleteMany({})
    }
})

afterAll(async ()=>{
    await mongo.stop()
    await mongoose.connection.close()
})