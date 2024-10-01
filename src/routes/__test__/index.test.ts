import request from 'supertest'
import { app }  from '../../app'

const games = async () => {
    return request(app)
        .post('/api/games')
        .send({
            title: 'test',
            name: 'thuan',
            provider: 'thuan',
            genre: 'thuan',
        })
        .expect(201)  
}

it('get all games', async () =>{
    await games()
    await games()
    await games()

    const responseGame = await request(app)
        .get(`/api/games`)
        .send()
        .expect(200)

    expect(responseGame.body.games.length).toEqual(3)
})