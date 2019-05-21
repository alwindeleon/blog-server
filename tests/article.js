'use strict';

var request = require('supertest');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';

/*
 *  ==== POST === 
 */

//Simple POST
describe('POST New Article', function () {
  it('creates new article and responds with json success message', function (done) {
    request(app)
      .post('/api/article')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'data': {"title":"lorem pisum dolor sit amet","excerpt":"lorem pisum dolor sit amet","content":"lorem pisum dolor sit amet","published":true,"created":"2019-05-21T06:27:31.003Z","author_id":"lorem pisum dolor sit amet"}
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
  it('Does not create new \'article\' and responds with json error message', function (done) {
    request(app)
      .post('/api/article')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'dataX': {"title":"lorem pisum dolor sit amet","excerpt":"lorem pisum dolor sit amet","content":"lorem pisum dolor sit amet","published":true,"created":"2019-05-21T06:27:31.003Z","author_id":"lorem pisum dolor sit amet"}
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

// Get List of Articles
describe('GET List of Articles', function () {
  it('responds with a list of article items in JSON', function (done) {
    request(app)
      .get('/api/articles')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Get Single Articles
describe('GET Article by ID', function () {
  it('responds with a single article item in JSON', function (done) {
    request(app)
      .get('/api/article/' + _id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


// Get Single Article Incorrectly
describe('GET Item by Incorrect ID', function () {
  it('responds with a error status for \'article\' in JSON', function (done) {
    request(app)
      .get('/api/article/' + _id + 'X')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done);
  });
});


// Get Single Article Incorrectly
describe('GET Item by missing ID', function () {
  it('responds with a error status for \'article\' in JSON', function (done) {
    request(app)
      .get('/api/article/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

/*
 *  ==== PUT === 
 */

//Simple PUT
describe('PUT Article by ID', function () {
  it('updates article item in return JSON', function (done) {
    request(app)
      .put('/api/article/' + _id)
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
  it('Does not update \'article\' & return JSON with error status', function (done) {
    request(app)
      .put('/api/article/' + _id + 'X')
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
  it('Does not update article & return JSON with error status', function (done) {
    request(app)
      .put('/api/article/' + _id)
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
describe('DELETE Article by ID', function () {
  it('should delete article and return 200 status code', function (done) {
    request(app)
      .del('/api/article/' + _id)
      .expect(202, done);
  });
});

//Incorrect Delete
describe('DELETE Item by Incorrect ID', function () {
  it('should NOT delete item and return 500 status code', function (done) {
    request(app)
      .del('/api/article/' + _id + 'X')
      .expect(500, done);
  });
});
