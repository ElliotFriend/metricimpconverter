function ConvertHandler() {

  // TODO: Complete the necessary conversion logic in
  // `/controllers/convertHandler.js`

  this.getNum = function(input) {
    let re = /^(?<numerator>\d+\.?\d*)(?<slash>\/)?(?<denominator>\d+\.?\d*)?[a-z]/i
    let match = input.match(re)
    if (match) {
      let numerator = parseFloat(match.groups.numerator)
      let denominator = parseFloat(match.groups.denominator) || 1
      if ((match.groups.slash && !match.groups.denominator)
        || !match.groups.slash && match.groups.denominator) {
        console.log('invalid number')
        return null
      } else {
        return numerator / denominator
      }
    } else {
      console.log('invalid number')
      return null
    }
  };

  this.getUnit = function(input) {
    const units = ['gal', 'l', 'kg', 'lbs', 'mi', 'km']
    let re = /(?<unit>[galkbsmi]+)$/i
    let match = input.match(re)
    if (units.includes(match.groups.unit.toLowerCase())) {
      let initUnit = match.groups.unit.toLowerCase()
      return initUnit === 'l' ? 'L' : initUnit
    } else {
      console.log('invalid unit')
      return null
    }
  };

  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case 'gal':
        return 'L'
      case 'L':
        return 'gal'
      case 'lbs':
        return 'kg'
      case 'kg':
        return 'lbs'
      case 'mi':
        return 'km'
      case 'km':
        return 'mi'
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case 'gal':
        return 'gallons'
      case 'L':
        return 'liters'
      case 'lbs':
        return 'pounds'
      case 'kg':
        return 'kilograms'
      case 'mi':
        return 'miles'
      case 'km':
        return 'kilometers'
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal':
        return initNum * galToL
      case 'L':
        return initNum / galToL
      case 'lbs':
        return initNum * lbsToKg
      case 'kg':
        return initNum / lbsToKg
      case 'mi':
        return initNum * miToKm
      case 'km':
        return initNum / miToKm
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
  };

}

module.exports = ConvertHandler;
