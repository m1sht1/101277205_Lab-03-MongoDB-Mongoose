const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	address: {
		_id: false,
		building: String,
		street: String,
		zipcode: String,
	},

	city: String,
	cuisine: String,
	name: String,
	restaurant_id: String,
});

module.exports = mongoose.model('Restaurant', userSchema);
