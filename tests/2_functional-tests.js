const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../app');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000)

  suite('Integration tests with `chai-http`', function() {

    test('Convert a valid input such as 10L: GET request to /api/convert.', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=10L')
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be "200"')
          assert.typeOf(res.body, 'object', 'returned body should be an "object"')
          assert.equal(res.body.initNum, 10, 'initNum should be read as "10"')
          assert.equal(res.body.initUnit, 'L', 'initUnit should be read as "L"')
          assert.equal(res.body.returnNum, 2.64172, 'returnNum should be "2.64172"')
          assert.equal(res.body.returnUnit, 'gal', 'returnUnit should be "gal"')
          assert.equal(res.body.string, '10 liters converts to 2.64172 gallons', 'string should contain correct values')
          done()
        })
    })

    test('Convert an invalid input such as 32g: GET request to /api/convert.', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=32g')
        .end( (err, res) => {
          assert.equal(res.status, 502, 'input containing an invalid unit should respond with status "502"')
          assert.equal(res.text, 'invalid unit', 'returned text should be "invalid unit"')
          done()
        })
    })

    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end( (err, res) => {
          assert.equal(res.status, 501, 'input containing an invalid number should respond with status "501"')
          assert.equal(res.text, 'invalid number', 'returned text should be "invalid number"')
          done()
        })
    })

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end( (err, res) => {
          assert.equal(res.status, 503, 'input containing an invalid number AND invalid unit should respond with status "503"')
          assert.equal(res.text, 'invalid number and unit', 'returned text should be "invalid number and unit"')
          done()
        })
    })

    test('Convert with no number such as kg: GET request to /api/convert.', (done) => {
      chai
        .request(server)
        .get('/api/convert?input=kg')
        .end( (err, res) => {
          assert.equal(res.status, 200, 'return status should be "200"')
          assert.typeOf(res.body, 'object', 'returned body should be an "object"')
          assert.equal(res.body.initNum, 1, 'initNum should be read as "1"')
          assert.equal(res.body.initUnit, 'kg', 'initUnit should be read as "kg"')
          assert.equal(res.body.returnNum, 2.20462, 'returnNum should be "2.20462"')
          assert.equal(res.body.returnUnit, 'lbs', 'returnUnit should be "lbs"')
          assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds', 'string should contain correct values')
          done()
        })
    })

  })

});
