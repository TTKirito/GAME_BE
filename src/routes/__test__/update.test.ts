import request from 'supertest'
import { app }  from '../../app'
import mongoose from 'mongoose'

it('returns a 404 if invalid gameID', async () =>{
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/games/${id}`)
        .send({
            title: 'test',
            name: 'thuan',
            provider: 'thuan',
            genre: 'thuan',
        })
        .expect(404)
})

it('returns 200 if valid input ', async ()=>{
    const response = await request(app)
        .post('/api/games')
        .send({
            title: 'test',
            name: 'thuan',
            provider: 'thuan',
            genre: 'thuan',
        })
        .expect(201) 
    await request(app)
        .put(`/api/games/${response.body.id}`)
        .send({
            title: 'test',
            name: 'thuan',
            provider: 'thuan',
            genre: 'thuan',
        })
        .expect(200)
    
})