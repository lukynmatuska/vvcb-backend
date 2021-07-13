/**
 * Season database model
 * @author Lukas Matuska (matuska.lukas@lukasmatuska.cz)
 * @version 1.0
 */

// library for easy database manipulations
const mongoose = require('../libs/db')

// the schema itself
var seasonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'archived', 'prepared'],
        default: 'prepared'
    },
})

// export
module.exports = mongoose.model('Season', seasonSchema, 'season')
