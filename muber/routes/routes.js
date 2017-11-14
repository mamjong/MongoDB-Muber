const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {

	/*
	Watch for incoming requests of method GET
	to the route http://localhost:3050/api
	 */
	// .greeting, not .greeting() because it is invoked in the future, not once it reaches this point. .create is a
	// reference to a function, not a call.
	app.get('/api', DriversController.greeting);

	app.post('/api/drivers', DriversController.create);

	app.put('/api/drivers/:id', DriversController.edit);

	app.delete('/api/drivers/:id', DriversController.remove);
};