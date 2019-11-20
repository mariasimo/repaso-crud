const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema
const parkSchema = new Schema ({
    name : String,
    description : String,
    active: Boolean
})

module.exports = mongoose.model('Park', parkSchema)