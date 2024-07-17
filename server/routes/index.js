// exports cac file vao server de su dung

const { errHandler, badRequestException } = require('../middlewares/errorHandler')
const auth = require('./auth')  
const user = require('./user')  

const initRoutes = (app) => {
    app.use('/api/user', user)
    app.use('/api/auth', auth)

    app.use(badRequestException)
    app.use(errHandler)
}

module.exports = initRoutes