/**
 * Rules database model
 * @author Lukas Matuska (matuska.lukas@lukasmatuska.cz)
 * @version 1.0
 */

// library for easy database manipulations
const mongoose = require('../libs/db')

// the schema itself
var rulesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
})

// export
module.exports = mongoose.model('Rules', rulesSchema, 'rules')
