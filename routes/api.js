'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  // TODO: Complete the necessary routes in `/routes/api.js`
  app.route('/api/convert').get((req, res) => {
    let queryInput = req.query.input
    let initNum = convertHandler.getNum(queryInput)
    let initUnit = convertHandler.getUnit(queryInput)
    let returnNum = convertHandler.convert(initNum, initUnit)
    let returnUnit = convertHandler.getReturnUnit(initUnit)

    if (!initNum && !initUnit) {
      res.status(503).send('invalid number and unit')
    } else if (!initNum) {
      res.status(501).send('invalid number')
    } else if (!initUnit) {
      res.status(502).send('invalid unit')
    }

    let responseObject = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: convertHandler.getString(initNum, convertHandler.spellOutUnit(initUnit), returnNum, convertHandler.spellOutUnit(returnUnit))
    }
    res.json(responseObject)
  })

};
