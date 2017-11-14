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

	create(req, res, next) {
		const driverProps = req.body;

		Driver.create(driverProps)
			.then((driver) => res.send(driver))
			.catch((next));
	},

	edit(req, res, next) {
		const driverId = req.params.id;
		const driverProps = req.body;

		Driver.findByIdAndUpdate(driverId, driverProps)
			.then(() => Driver.findById(driverId))
			.then((driver) => res.send(driver))
			.catch((next));
	},

	remove(req, res, next) {
		const driverId = req.params.id;

		Driver.findByIdAndRemove(driverId)
			.then((driver) => res.status(204).send(driver))
			.catch((next));
	}
};