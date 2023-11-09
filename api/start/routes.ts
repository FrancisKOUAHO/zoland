import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', async () => {
        return {hello: 'bienvenue'}
    })

    Route.group(() => {
        Route.get('check', 'AuthController.check')
        Route.post('register', 'AuthController.register')
        Route.post('login', 'AuthController.login')

        Route.group(() => {
            Route.get('me', 'AuthController.me')
            Route.delete('logout', 'AuthController.logout')
        }).middleware('auth')
    }).prefix('auth')

    Route.group(() => {
        Route.get('/', 'GamesController.index')
        Route.get(':id', 'GamesController.show')
        Route.post('/', 'GamesController.store')
        Route.patch(':id', 'GamesController.update')
        Route.delete(':id', 'GamesController.destroy')
    }).prefix('games')

    Route.get("sse", ({sse}) => {
        sse.send({message: "To the moon!🚀"});
    }).middleware(["sse"])

}).prefix('api/v1')
