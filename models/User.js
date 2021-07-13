/**
 * User database model
 * @author Lukas Matuska (lukynmatuska@gmail.com)
 * @version 1.0
 */

/**
 * Libs
 */
// library for easy database manipulations
const mongoose = require('../libs/db')

// the schema itself
var userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rescue: {
        enabled: {
            type: Boolean,
            default: false
        },
        hash: {
            type: String,
            default: undefined
        }
    },
    type: {
        type: String,
        enum: ['result-filler', 'admin'],
        default: 'result-filler'
    }
})

// export
module.exports = mongoose.model('User', userSchema, 'user')
