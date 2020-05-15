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
	duties: [mongoose.Schema.Types.Mixed],
	template:[mongoose.Schema.Types.Mixed],
	completedChecklist:[mongoose.Schema.Types.Mixed]
});

module.exports = mongoose.model('Property', propertySchema);
