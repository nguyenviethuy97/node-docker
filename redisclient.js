const redis = require('redis')

const redisClient = redis.createClient({
    legacyMode: true,
})

async () => {
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
}

module.exports = redisClient