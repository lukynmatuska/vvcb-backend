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
        ref: 'Rules',
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }],
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
        required: true,
    },
    startingGrid: [{
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
        paid: {
            type: Boolean,
            default: false,
        },
        result: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Result',
        },
    }],
})

// export
module.exports = mongoose.model('Race', raceSchema, 'race')
