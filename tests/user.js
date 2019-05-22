'use strict';

var request = require('supertest');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';

/*
 *  ==== POST === 
 */

//Simple POST
describe('POST New User', function () {
  it('creates new user and responds with json success message', function (done) {
    request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'data': {"username":"lorem pisum dolor sit amet","password":"lorem pisum dolor sit amet","description":"lorem pisum dolor sit amet","profile_url":"lorem pisum dolor sit amet"}
      })
      .expect(201)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        _id = res.body.data._id;
        done();
      });
  });
});

//Incorrect POST
describe('POST New Item Incorrectly', function () {
  it('Does not create new \'user\' and responds with json error message', function (done) {
    request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'dataX': {"username":"lorem pisum dolor sit amet","password":"lorem pisum dolor sit amet","description":"lorem pisum dolor sit amet","profile_url":"lorem pisum dolor sit amet"}
      })
      .expect(500)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});



/*
 *  ==== GET === 
 */

// Get List of Users
describe('GET List of Users', function () {
  it('responds with a list of user items in JSON', function (done) {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Get Single Users
describe('GET User by ID', function () {
  it('responds with a single user item in JSON', function (done) {
    request(app)
      .get('/api/user/' + _id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


// Get Single User Incorrectly
describe('GET Item by Incorrect ID', function () {
  it('responds with a error status for \'user\' in JSON', function (done) {
    request(app)
      .get('/api/user/' + _id + 'X')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done);
  });
});


// Get Single User Incorrectly
describe('GET Item by missing ID', function () {
  it('responds with a error status for \'user\' in JSON', function (done) {
    request(app)
      .get('/api/user/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

/*
 *  ==== PUT === 
 */

//Simple PUT
describe('PUT User by ID', function () {
  it('updates user item in return JSON', function (done) {
    request(app)
      .put('/api/user/' + _id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'data': {
          'title': 'Hell Is Where There Are No Robots'
        }
      })
      .expect(200, done);
  });
});

// PUT with Incorrect id
describe('PUT Item by Incorrect ID', function () {
  it('Does not update \'user\' & return JSON with error status', function (done) {
    request(app)
      .put('/api/user/' + _id + 'X')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        data: {
          'title': 'Hell Is Where There Are No Robots'
        }
      })
      .expect(500, done);
  });
});

// PUT with Incorrect data
describe('PUT Item by Incorrect data', function () {
  it('Does not update user & return JSON with error status', function (done) {
    request(app)
      .put('/api/user/' + _id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'dataX': {
          'title': 'Hell Is Where There Are No Robots'
        }
      })
      .expect(500, done);
  });
});



/*
 *  ==== DELETE === 
 */

//Simple Delete
describe('DELETE User by ID', function () {
  it('should delete user and return 200 status code', function (done) {
    request(app)
      .del('/api/user/' + _id)
      .expect(202, done);
  });
});

//Incorrect Delete
describe('DELETE Item by Incorrect ID', function () {
  it('should NOT delete item and return 500 status code', function (done) {
    request(app)
      .del('/api/user/' + _id + 'X')
      .expect(500, done);
  });
});
