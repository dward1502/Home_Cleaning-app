const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: String,
  owner: String,
  email: String,
  lockbox: String,
  doorcode: String,
  type: String,
  description: String,
  duties:[{}]
})

module.exports = mongoose.model('Property', propertySchema)