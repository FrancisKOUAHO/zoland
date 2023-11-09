import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game'

export default class GamesController {
  public async index({ response }: HttpContextContract) {
    const games = await Game.all()
    return response.json(games)
  }

  public async show({ params, response }: HttpContextContract) {
    const gameId = params.id
    const game = await Game.find(gameId)

    if (!game) {
      return response.status(404).json({ message: 'Jeu non trouvé' })
    }

    return response.json(game)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'description'])

    const game = new Game()
    game.fill(data)
    await game.save()

    return response.status(201).json(game)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const gameId = params.id
    const game = await Game.find(gameId)

    if (!game) {
      return response.status(404).json({ message: 'Jeu non trouvé' })
    }

    const data = request.only(['name', 'description'])

    game.merge(data)
    await game.save()

    return response.json(game)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const gameId = params.id
    const game = await Game.find(gameId)

    if (!game) {
      return response.status(404).json({ message: 'Jeu non trouvé' })
    }

    await game.delete()

    return response.noContent()
  }
}
