function ConvertHandler() {

  // TODO: Complete the necessary conversion logic in
  // `/controllers/convertHandler.js`
  const re = /^(?<number>[\d\.\/]+)?(?<unit>[a-z]+)?$/i

  this.getNum = (input) => {
    if (!input) { return 1 }
    let match = input.match(re)
    if (match.groups.number) {
      let numString = match.groups.number
      let [ num, den, rest ] = numString.split('/')
      if (rest) {
        return null
      } else if (den) {
        num = Number(num)
        den = Number(den)
        return parseFloat((num / den).toFixed(5)) || null
      } else {
        return parseFloat(Number(num).toFixed(5)) || null
      }
    } else {
      return 1
    }
  };

  this.getUnit = (input) => {
    const units = ['gal', 'l', 'kg', 'lbs', 'mi', 'km']
    let match = input.match(re)
    if (match.groups.unit) {
      let unitString = match.groups.unit.toLowerCase()
      if (units.includes(unitString)) {
        return unitString === 'l' ? 'L' : unitString
      } else {
        return null
      }
    } else {
      return null
    }
  };

  this.getReturnUnit = (initUnit) => {
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

  this.spellOutUnit = (unit) => {
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

  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal':
        return parseFloat((initNum * galToL).toFixed(5))
      case 'L':
        return parseFloat((initNum / galToL).toFixed(5))
      case 'lbs':
        return parseFloat((initNum * lbsToKg).toFixed(5))
      case 'kg':
        return parseFloat((initNum / lbsToKg).toFixed(5))
      case 'mi':
        return parseFloat((initNum * miToKm).toFixed(5))
      case 'km':
        return parseFloat((initNum / miToKm).toFixed(5))
    }
  };

  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
  };

}

module.exports = ConvertHandler;
