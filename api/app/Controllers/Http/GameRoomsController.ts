import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GameRoomsController {
  public async index({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {
    //Ws.io.emit('new:user', { username: 'virk' })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
