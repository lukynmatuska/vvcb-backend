/**
 * The entry point of the Node.js api
 * @author Lukas Matuska
 * @version 1.0
 * @license Beerware
 */

// Configuration global variable
try {
  global.CONFIG = require('./config')
} catch (error) {
  console.log('not foung config.js, using ENV variables')
  global.CONFIG = {
    port: process.env.PORT,

    cors_options: JSON.parse(process.env.CORS_OPTIONS) || {},

    session: {
      secret: process.env.SESSION_SECRET || 'secret',
      maxAge: parseInt(process.env.COOKIE_MAX_AGE || 86400000)
    },

    nodemailer: {
      sender: process.env.SMTP_SENDER || `Výsledky Velké Ceny Blanenska <${process.env.SMTP_USER}>`,
      settings: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE, // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
      }
    },

    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },

    db: {
      port: process.env.MONGODB_PORT || 27017,
      host: process.env.MONGODB_HOST || 'localhost',
      name: process.env.MONGODB_NAME || 'vvcb',
      user: process.env.MONGODB_USER || 'root',
      password: process.env.MONGODB_PASS || '',
      options: process.env.MONGODB_OPTIONS || ''
    },

    contactPersonEmail: process.env.CONTACT_PERSON_EMAIL || 'info@vvcb.cz',
  }
}

if (global.CONFIG.redis === undefined) {
  global.CONFIG.redis = {}
}

if (global.CONFIG.redis.url === undefined) {
  global.CONFIG.redis.url = 'redis://localhost:6379'
}

// Load the server lib (Express)
const express = require('express')
const app = express()

// load some libraries
const moment = require('./libs/moment')
const bodyparser = require('body-parser')
const cors = require('cors')
console.log(`CORS_OPTIONS: ${JSON.stringify(global.CONFIG.cors_options)}`)
app.use(cors(global.CONFIG.cors_options))

// Session handling
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)

// Connect to the redis server
const redisClient = redis.createClient(global.CONFIG.redis.port, global.CONFIG.redis.host)
redisClient.on('error', console.error)
const store = new RedisStore({
  host: global.CONFIG.redis.host,
  port: global.CONFIG.redis.port,
  client: redisClient,
  ttl: 86400
})

// set up the redis store to saving session data
app.use(session({
  secret: global.CONFIG.session.secret,
  store,
  name: 'BSID',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: global.CONFIG.session.maxAge
  }
}))
app.use((req, res, next) => {
  if (!req.session) {
    console.error(`${moment().format('YYYY-MM-DD HH:mm:ss')} Something went wrong with Redis!`)
    return res.send(`${moment().format('YYYY-MM-DD HH:mm:ss')} Something went wrong with Redis!`)
  }
  next() // otherwise continue
})

// set extended urlencoded to true (post)
app.use(bodyparser.json({ limit: '50mb' }))
app.use(bodyparser.urlencoded({ extended: true }))
app.set('trust proxy', true)

/**
 * Routers
*/
const rootRouter = require('./routes/root')
app.use('/', rootRouter)

// run the server
app.listen(global.CONFIG.port, () => {
  console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} CORS-enabled web app listening on port ${global.CONFIG.port} (vvcb-backend Node.js app)`)
})
