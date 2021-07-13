/**
 * ResultFiller database model
 * @author Lukas Matuska (matuska.lukas@lukasmatuska.cz)
 * @version 1.0
 */

// library for easy database manipulations
const mongoose = require('../libs/db')

// the schema itself
var resultFillerSchema = new mongoose.Schema({
    // will be defined
})

// export
module.exports = mongoose.model('ResultFiller', resultFillerSchema, 'resultFiller')
