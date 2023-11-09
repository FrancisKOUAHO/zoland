import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'

test.group('Users', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('ensure we can get logged in user details', async ({ assert, client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/auth/me').loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().id, user.id)
  })

  test('ensure auth check returns correct status when guest', async ({ client }) => {
    const response = await client.get('/api/v1/auth/check')

    response.assertStatus(200)
    response.assertBodyContains({ authenticated: false })
  })

  test('ensure auth check returns correct status when auth', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/auth/check').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({ authenticated: true })
  })
})

test.group('Users | Login / Logout', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('ensure we can login user', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client
      .post('/api/v1/auth/login')
      .json({ email: user.email, password: 'secret1234' })

    response.assertStatus(204)
  })

  test('ensure throw error when login with invalid password', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client
      .post('/api/v1/auth/login')
      .json({ email: user.email, password: 'invalid' })

    response.assertStatus(400)
    response.assertBodyContains({
      code: 'E_INVALID_CREDENTIALS',
      message: 'No account can be found with the provided credentials.',
    })
  })

  test('ensure throw error when login with invalid email', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .json({ email: 'francis.kouaho@example.com', password: 'invalid' })

    response.assertStatus(400)
    response.assertBodyContains({
      code: 'E_INVALID_CREDENTIALS',
      message: 'No account can be found with the provided credentials.',
    })
  })

  test('ensure that we can log out a user', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.delete('/api/v1/auth/logout').loginAs(user)

    response.assertStatus(204)
  })
})

test.group('Users | Register', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('ensure user can register', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'francis.kouaho@example.com',
      username: 'franciskouaho',
      password: 'secret1234',
    })

    response.assertStatus(201)
  })

  test('ensure user cannot register with an existing email', async ({ client }) => {
    await UserFactory.merge({ email: 'francis.kouaho@example.com' }).create()

    const response = await client.post('/api/v1/auth/register').json({
      email: 'francis.kouaho@example.com',
      username: 'franciskouaho',
      password: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          rule: 'unique',
          message: 'An account already exists with the provided email.',
        },
      ],
    })
  })

  test('ensure user cannot register with an invalid email', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'francis.kouaho',
      username: 'franciskouaho',
      password: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          rule: 'email',
          message: 'Your email is not valid.',
        },
      ],
    })
  })

  test('ensure user cannot register with a short password', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'francis.kouaho@example.com',
      username: 'franciskouaho',
      password: 'secret',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'password',
          rule: 'minLength',
          message: 'Your password needs to be at least 8 characters long.',
        },
      ],
    })
  })

  test('ensure user cannot register with a username that is already taken', async ({ client }) => {
    await UserFactory.merge({ username: 'franciskouaho' }).create()

    const response = await client.post('/api/v1/auth/register').json({
      email: 'francis.kouaho@example.com',
      username: 'franciskouaho',
      password: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'username',
          rule: 'unique',
          message: 'An account already exists with the provided username.',
        },
      ],
    })
  })

  test('ensure user cannot register with a username that is too short', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'francis.kouaho@example.com',
      username: 'rom',
      password: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'username',
          rule: 'minLength',
          message: 'Your username needs to be at least 4 characters long.',
        },
      ],
    })
  })

  test('ensure user cannot register with a username that is too long', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'francis.kouaho@example.com',
      username: 'franciskouahofranciskouahofranciskouahofranciskouahofranciskouahofranciskouaho',
      password: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'username',
          rule: 'maxLength',
          message: 'Your username cannot be longer than 25 characters.',
        },
      ],
    })
  })
})
