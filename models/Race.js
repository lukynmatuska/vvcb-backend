/**
 * Race database model
 * @author Lukas Matuska (matuska.lukas@lukasmatuska.cz)
 * @version 1.0
 */

// library for easy database manipulations
const mongoose = require('../libs/db')

// the schema itself
var raceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rules: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rules'
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season'
    },
})

// export
module.exports = mongoose.model('Race', raceSchema, 'race')
