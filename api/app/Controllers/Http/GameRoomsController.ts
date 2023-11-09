import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GameRoomsController {
  public async index({}: HttpContextContract) {}

  public async create({ sse }: HttpContextContract) {
    console.log(sse.id)
    sse.send({ message: `GameRooms!🚀 ${sse.id as String}` })
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
