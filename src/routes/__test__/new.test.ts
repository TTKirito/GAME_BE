import request from 'supertest'
import { app } from '../../app'
import { Game } from '../../models/game'

it('returns 400 if invalid input', async () => {
    await request(app)
        .post('/api/games')
        .send({
            title: '',
            name: '',
            provider: '',
            genre: '',
        })
        .expect(400)  
    await request(app)
        .post('/api/games')
        .send({
            title: '',
            name: 'thuan',
            provider: 'thuan',
            genre: 'thuan',
        })
        .expect(400) 
    await request(app)
        .post('/api/games')
        .send({
            title: 'test',
            name: '',
            provider: 'thuan',
            genre: 'thuan',
        })
        .expect(400) 
    await request(app)
        .post('/api/games')
        .send({
            title: 'test',
            name: 'thuan',
            provider: '',
            genre: 'thuan',
        })
        .expect(400) 
    await request(app)
        .post('/api/games')
        .send({
            title: 'test',
            name: 'thuan',
            provider: 'thuan',
            genre: '',
        })
        .expect(400) 
})

it('returns 201 if valid input', async () => {
    const response = await request(app)
        .post('/api/games')
        .send({
            title: 'test',
            name: 'thuan',
            provider: 'thuan',
            genre: 'thuan',
        })
        .expect(201) 
})