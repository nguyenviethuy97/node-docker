const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('redis')
// const connectRedis = require('connect-redis')
// let RedisStore = connectRedis(session)
let RedisStore = require('connect-redis')(session)
const {
    MONGO_IP,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_USER,
    REDIS_PORT,
    REDIS_URL,
    SESSION_SECRET,
} = require('./config/config')


//APP
const app = express()

//ROUTES
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

//DB CONNECT
const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const connectWithRetry = () => {
    mongoose
        .connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Successfully connected to Db"))
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
        })
}
connectWithRetry();

//session middleware
//CONFIG SESSION REDIS

const redisClient = redis.createClient({
    legacyMode: true,
    host: REDIS_URL,
    port: REDIS_PORT
})
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    //đặt lại session cookie cho mỗi request
    resave: false,
    saveUninitialized: false,
    // proxy: true,
    // unset: 'keep',
    cookie: {
        secure: false,
        // resave: false,
        // saveUninitialized: false,
        httpOnly: true,
        maxAge: 300000,
    },
}))

app.use(express.json())
app.get('/', (req, res) => {
    res.send('<h1>Hi there!!!! </h1>')
})
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port} ....`))
