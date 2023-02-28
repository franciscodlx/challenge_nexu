'use strict'
/* global describe it */
var request = require('supertest')

/*obtenemos nuestra api rest que vamos a testear*/
var app = require('../src/index')

describe('Test servicios', function() {
  it('Crea la brand retornando 201', function(done) {
    request(app)
      .post('/api/v1/brands')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'name': 'Pemex'
      })
      .expect(201, done)
  })

  it('Crea el nuevo modelo retornando 201', function(done) {
    request(app)
      .post('/api/v1/brands/5/models')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'name': 'Telcel',
        'average_price': 50000
      })
      .expect(201, done)
  })

  it('Se actualiza el average del modelo 7 retornando 200', function(done) {
    request(app)
      .put('/api/v1/models/7')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'average_price': 50000
      })
      .expect(200, done)
  })
})