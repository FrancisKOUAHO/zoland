import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public me({ auth }: HttpContextContract) {
    return auth.user
  }

  public async check({ auth, response }: HttpContextContract) {
    return response.ok({ authenticated: auth.isAuthenticated })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()

    const token = await auth.use('web').attempt(email, password)

    if (!token) {
      return response.badRequest()
    }

    return response.ok(token.toJSON())
  }

  public async register({ request, response }: HttpContextContract) {

    const payload = await request.validate(CreateUserValidator)

    const user: User = await User.create(payload)

    if (!user) {
      return response.badRequest()
    }

    return response.created()
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.noContent()
  }
}
