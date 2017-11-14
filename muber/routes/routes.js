const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {

	/*
	Watch for incoming requests of method GET
	to the route http://localhost:3050/api
	 */
	// .greeting, not .greeting() because it is invoked in the future, not once it reaches this point
	app.get('/api', DriversController.greeting);
};