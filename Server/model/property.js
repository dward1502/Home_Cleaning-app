const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	address: String,
	owner: String,
	email: String,
	lockbox: String,
	doorcode: String,
	type: String,
	description: String,
	duties: [
		{
      _id:false,
			Cleaner1: String,
			Cleaner2: String,
			Cleaner3: String,
			Cleaner4: String
		}
	]
});

module.exports = mongoose.model('Property', propertySchema);
