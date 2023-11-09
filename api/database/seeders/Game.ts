import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import GameFactory from "Database/factories/GameFactory";

export default class extends BaseSeeder {
    public async run() {
        await GameFactory.createMany(100)
    }
}
