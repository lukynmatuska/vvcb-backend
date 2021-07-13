/**
 * Category database model
 * @author Lukas Matuska (matuska.lukas@lukasmatuska.cz)
 * @version 1.0
 */

// library for easy database manipulations
const mongoose = require('../libs/db')

// the schema itself
var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

// export
module.exports = mongoose.model('Category', categorySchema, 'category')
