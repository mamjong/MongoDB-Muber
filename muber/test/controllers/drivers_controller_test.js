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
});