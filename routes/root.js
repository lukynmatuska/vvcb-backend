/**
 * The root API router
 * @author Lukas Matuska (lukynmatuska@gmail.com)
 * @version 1.0
 * @see https://lukasmatuska.cz/
 */

/**
 * Express router API
 */
const router = require('express').Router()
// const partials = require('./partials')

/**
 * Libraries
 */
const moment = require('../libs/moment')

/**
 * Controllers
 */
// const userController = require('../controllers/user')

/**
 * Routes
 */

// Home
router.get('/', (req, res) => {
    return res
        .status(200)
        .json({
            message: 'hello world!',
            time: moment()
        })
})

/**
 * Error pages for test
 */
router.get('/403', (req, res) => {
    return res
        .status(403)
        .json({
            status: '403',
            error: 'access-denied'
        })
})

router.get('/404', (req, res) => {
    return res
        .status(404)
        .json({
            status: '404',
            error: 'not-found'
        })
})

router.get('/500', (req, res) => {
    return res
        .status(500)
        .json({
            status: '500',
            error: 'internal'
        })
})

/**
 * Sessions
 */
router.get('/session', (req, res) => {
    let session = req.session
    if (session.user) {
        if (session.user.password) {
            delete session.user.password
        }
    }
    res.status(200).json(session)
})

router.all('/session/destroy', (req, res) => {
    req.session.destroy()
    res.status(200).json({
        status: 'ok'
    })
})

/**
 * Not found route
 */
router.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        error: 'not-found'
    })
})

module.exports = router
