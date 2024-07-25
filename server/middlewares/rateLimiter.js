const redis = require('../config/redis.config')

const rateLimiter = async (req, res, next) => {
    const clientId = req.headers?.client_id

    const currentTime = Date.now() // ms

    const client = await redis.hGetAll(`ratelimit-${clientId}`)
    // console.log(client)
    if(Object.keys(client).length === 0) {
        await redis.hSet(`ratelimit-${clientId}`, 'createAt', currentTime)
        await redis.hSet(`ratelimit-${clientId}`, 'count', 1)

        return next()
    }

    let diference = (currentTime - +client.createAt) / 1000 // s
    // console.log(diference)
    if(diference >= +process.env.RATE_LIMIT_RESET) {
        await redis.hSet(`ratelimit-${clientId}`, 'createAt', currentTime)
        await redis.hSet(`ratelimit-${clientId}`, 'count', 1)

        return next()
    }

    if(client.count > +process.env.RATE_LIMIT_COUNT){
        return res.status(429).json({
            success: false,
            mes: 'Dont spam!!!'
        })
    }else{
        await redis.hSet(`ratelimit-${clientId}`, 'count', +client.count + 1)
        return next()
    }

}

module.exports = rateLimiter