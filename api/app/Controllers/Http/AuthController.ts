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

    await auth.attempt(email, password)

    return response.noContent()
  }

  public async register({ auth, request, response }: HttpContextContract) {

    const payload = await request.validate(CreateUserValidator)

    const user: User = await User.create(payload)

    await auth.login(user)

    return response.created()
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.noContent()
  }
}
