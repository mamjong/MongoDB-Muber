const Driver = require('../models/driver');

module.exports = {

	// ES6
	greeting(req, res) {
		res.send({ hi: 'there' });
	},

	/* ES5
	greeting: function(req, res) {

	}
	*/

	create(req, res) {
		const driverProps = req.body;

		Driver.create(driverProps)
			.then((driver) => res.send(driver));
	}
};