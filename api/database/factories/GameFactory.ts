import GameFactory from 'App/Models/Game'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(GameFactory, ({faker}) => {
    return {
        title: faker.internet.userName(),
        description: faker.internet.email(),
        url: faker.internet.url(),
        maxPlayers: faker.number.int({min: 1, max: 10}),
    }
}).build()
