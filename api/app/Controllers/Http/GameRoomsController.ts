import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GameRoom from "App/Models/GameRoom";

export default class GameRoomsController {
  public async index({response}: HttpContextContract) {
    const gameRooms = await GameRoom.all()
    return response.json(gameRooms)
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
