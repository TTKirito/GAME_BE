import request from 'supertest'
import { app }  from '../../app'
import mongoose from 'mongoose'

it('returns 404 if not game id', async () =>{
    const id = new mongoose.Types.ObjectId().toHexString() 
    await request(app)
        .get(`/api/games/${id}`)
        .send()
        .expect(404)
})

it('returns game if valid game id', async () =>{
    const response = await request(app)
        .post('/api/games')
        .send({
            title: 'test',
            name: 'thuan',
            provider: 'thuan',
            genre: 'thuan',
        })
        .expect(201)

    const responseGame = await request(app)
        .get(`/api/games/${response.body.id}`)
        .send()
        .expect(200)
    expect(responseGame.body.title).toEqual('test')
})