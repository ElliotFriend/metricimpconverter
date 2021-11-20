const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('Reading Numbers', function() {
    test('convertHandler should correctly read a whole number input.', function() {
      assert.isOk(convertHandler.getNum('69'), 'getUnit return is OK with a whole number')
      assert.isNotNull(convertHandler.getNum('69'), 'getUnit return is not null with a whole number')
      assert.typeOf(convertHandler.getNum('69'), 'number', 'getUnit return is typeof number with a whole number')
    })

    test('convertHandler should correctly read a decimal number input.', function() {
      assert.isOk(convertHandler.getNum('69.69'), 'getUnit return is OK with a decimal number')
      assert.isNotNull(convertHandler.getNum('69.69'), 'getUnit return is not null with a decimal number')
      assert.typeOf(convertHandler.getNum('69.69'), 'number', 'getUnit return is typeof number with a decimal number')
    })

    test('convertHandler should correctly read a fractional input.', function() {
      assert.isOk(convertHandler.getNum('69/13'), 'getUnit return is OK with fractional input')
      assert.isNotNull(convertHandler.getNum('69/13'), 'getUnit return is not null with fractional input')
      assert.typeOf(convertHandler.getNum('69/13'), 'number', 'getUnit return is typeof number with fractional input')
    })

    test('convertHandler should correctly read a fractional input with a decimal.', function() {
      assert.isOk(convertHandler.getNum('69.69/13.13'), 'getUnit return is OK with fractional input with a decimal number')
      assert.isNotNull(convertHandler.getNum('69.69/13.13'), 'getUnit return is not null with fractional input with a decimal number')
      assert.typeOf(convertHandler.getNum('69.69/13.13'), 'number', 'getUnit return is typeof number with fractional input with a decimal number')
    })

    test('convertHandler should correctly return an error on a double-fraction.', function() {
      assert.isNotOk(convertHandler.getNum('625/25/5'), 'getUnit return is not OK on a double-fraction.')
      assert.isNull(convertHandler.getNum('625/25/5'), 'getUnit return is null on a double-fraction.')
      assert.notTypeOf(convertHandler.getNum('625/25/5'), 'number', 'getUnit return is not typeof number on a double-fraction.')
    })

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
      assert.strictEqual(convertHandler.getNum(), 1, 'getUnit returns 1 with blank input')
      assert.strictEqual(convertHandler.getNum(''), 1, 'getUnit returns 1 with "" input')
      assert.strictEqual(convertHandler.getNum('gal'), 1, 'getUnit returns 1 with "gal" input')
      assert.strictEqual(convertHandler.getNum('L'), 1, 'getUnit returns 1 with "L" input')
      assert.strictEqual(convertHandler.getNum('lbs'), 1, 'getUnit returns 1 with "lbs" input')
      assert.strictEqual(convertHandler.getNum('kg'), 1, 'getUnit returns 1 with "kg" input')
      assert.strictEqual(convertHandler.getNum('mi'), 1, 'getUnit returns 1 with "mi" input')
      assert.strictEqual(convertHandler.getNum('km'), 1, 'getUnit returns 1 with "km" input')
      assert.strictEqual(convertHandler.getNum('test'), 1, 'getUnit returns 1 with "test" input')
    })

  })

  suite('Reading Units', function() {
    test('convertHandler should correctly read each valid input unit.', function() {
      assert.isString(convertHandler.getUnit('gal'), 'Unit "gal" returns a string')
      assert.isString(convertHandler.getUnit('L'), 'Unit "L" returns a string')
      assert.isString(convertHandler.getUnit('lbs'), 'Unit "lbs" returns a string')
      assert.isString(convertHandler.getUnit('kg'), 'Unit "kg" returns a string')
      assert.isString(convertHandler.getUnit('mi'), 'Unit "mi" returns a string')
      assert.isString(convertHandler.getUnit('km'), 'Unit "km" returns a string')
    })

    test('convertHandler should correctly return an error for an invalid input unit.', function() {
      assert.isNull(convertHandler.getUnit('kilomegagram'), 'Unit "kilomegagram" returns null')
      assert.isNull(convertHandler.getUnit('oz'), 'Unit "oz" returns null')
      assert.isNull(convertHandler.getUnit('stroop'), 'Unit "stroop" returns null')
      assert.isNull(convertHandler.getUnit('mole'), 'Unit "mole" returns null')
      assert.isNull(convertHandler.getUnit('cm'), 'Unit "cm" returns null')
      assert.isNull(convertHandler.getUnit('in'), 'Unit "in" returns null')
      assert.isNull(convertHandler.getUnit('ton'), 'Unit "ton" returns null')
      assert.isNull(convertHandler.getUnit('buttload'), 'Unit "buttload" returns null')
    })

    test('convertHandler should return the correct return unit for each valid input unit.', function() {
      assert.strictEqual(convertHandler.getReturnUnit('gal'), "L", '"gal" return unit is "L"')
      assert.strictEqual(convertHandler.getReturnUnit('L'), "gal", '"L" return unit is "gal"')
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), "kg", '"lbs" return unit is "kg"')
      assert.strictEqual(convertHandler.getReturnUnit('kg'), "lbs", '"kg" return unit is "lbs"')
      assert.strictEqual(convertHandler.getReturnUnit('mi'), "km", '"mi" return unit is "km"')
      assert.strictEqual(convertHandler.getReturnUnit('km'), "mi", '"km" return unit is "mi"')
    })

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons', '"gal" spells out to "gallons"')
      assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters', '"L" spells out to "liters"')
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds', '"lbs" spells out to "pounds"')
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms', '"kg" spells out to "kilograms"')
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles', '"mi" spells out to "miles"')
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers', '"km" spells out to "kilometers"')
    })

  })

  suite('Conversion Calculations', function() {
    test('convertHandler should correctly convert gal to L.', function() {
      assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541, '1 gal converts to 3.78541 L')
      assert.strictEqual(convertHandler.convert(10, 'gal'), 37.8541, '10 gal converts to 37.8541 L')
    })

    test('convertHandler should correctly convert L to gal.', function() {
      assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417, '1 L converts to 0.26417 gal')
      assert.strictEqual(convertHandler.convert(10, 'L'), 2.64172, '10 L converts to 2.64172 gal')
    })

    test('convertHandler should correctly convert mi to km.', function() {
      assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934, '1 mi converts to 1.60934 km')
      assert.strictEqual(convertHandler.convert(10, 'mi'), 16.0934, '10 mi converts to 16.0934 km')
    })

    test('convertHandler should correctly convert km to mi.', function() {
      assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137, '1 km converts to 0.62137 mi')
      assert.strictEqual(convertHandler.convert(10, 'km'), 6.21373, '10 km converts to 6.21373 mi')
    })

    test('convertHandler should correctly convert lbs to kg.', function() {
      assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359, '1 lbs converts to 0.45359 kg')
      assert.strictEqual(convertHandler.convert(10, 'lbs'), 4.53592, '10 lbs converts to 4.53592 kg')
    })

    test('convertHandler should correctly convert kg to lbs.', function() {
      assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462, '1 kg converts to 2.20462 lbs')
      assert.strictEqual(convertHandler.convert(10, 'kg'), 22.04624, '10 kg converts to 22.04624 lbs')
    })

  })

});
