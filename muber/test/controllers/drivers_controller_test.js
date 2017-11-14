const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

/*
Requiring the driver model using this method prevents express from creating the driver model more than once.
Express doesn't work very well alongside mongoose and mocha.
*/
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
	it('posts to /api/drivers creates a new driver', (done) => {
		Driver.count()
			.then((count) => {
				request(app)
					.post('/api/drivers')
					.send({ email: 'test@test.com' })
					.end(() => {
						Driver.count().then((newCount) => {
							assert(count + 1 === newCount);
							done();
						});
					});
			});
	});

	it('puts to /api/drivers/id edits an existing driver', (done) => {
		const driver = new Driver({ email: 't@put.com', driving: false });

		driver.save()
			.then(() => {
				request(app)
					// ES6
					.put(`/api/drivers/${driver._id}`)
					// ES5
					// .put('/api/drivers/' + driver._id)
					.send({ driving: true })
					.end(() => {
						Driver.findOne({ email: 't@put.com' })
							.then((driver) => {
								assert(driver.driving === true);
								done();
							});
					});
			});
	});

	it('deletes to /api/drivers/id can delete a driver', (done) => {
		const driver = new Driver({ email: 't@delete.com' });

		driver.save()
			.then(() => {
				request(app)
					.delete(`/api/drivers/${driver._id}`)
					.end(() => {
						Driver.findOne({ email: 't@delete.com' })
							.then((driver) => {
								assert(driver === null);
								done();
							});
					});
			});
	});
});
