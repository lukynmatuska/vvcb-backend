/**
 * Result database model
 * @author Lukas Matuska (matuska.lukas@lukasmatuska.cz)
 * @version 1.0
 */

// library for easy database manipulations
const mongoose = require('../libs/db')

// the schema itself
var resultSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    time: {
        left: Number,
        right: Number,
        final: Number,
    },
    media: {
        youtube: String,
    }
}, {
    timestamps: true,
})

// export
module.exports = mongoose.model('Result', resultSchema, 'result')
