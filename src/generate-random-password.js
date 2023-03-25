const random = require('lodash.random');
const { isBoolean } = require('./utils');

/**
 * 
 * @param {{
 *       lowercase: boolean,
 *       uppercase: boolean,
 *       numbers: boolean,
 *       symbols: boolean
 *   }} options 
 * @param {number} length 
 * @param {boolean} strict 
 * @returns 
 */
const generateRandomPassword = (options, length = 8, strict) => {
    if (length < 6 && strict === true) {
        throw new Error('Password length should be at least 6 when strict is opted');
    }
    const { possibleCombinations: pool, opt } = getPool(options)
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomNumber = random(1, pool.length - 1)
        password += pool[randomNumber];
        
    }
    if (strict === true && length > 5) {
        const { lowercase, uppercase, numbers, symbols } = getAllCombinations();
        const destructured = {
            lowercase: { count: 0, isNeeded: opt.lowercase },
            uppercase: { count: 0, isNeeded: opt.uppercase },
            numbers: { count: 0, isNeeded: opt.numbers }
        }
        for (let i = 0; i < password.length; i++) {
            if (lowercase.includes(password[i])) {
                destructured.lowercase.count += 1;
            }
        
            if (uppercase.includes(password[i])) {
                destructured.uppercase.count += 1;
            }
        
            if (numbers.includes(password[i])) {
                destructured.numbers.count += 1;
            }
        }
        if (Object.keys(destructured).some(pass => destructured[pass].count === 0 && destructured[pass].isNeeded === true)) 
            return generateRandomPassword(options, length);
    }
    return password;
}
const getPool = (options) => {
    const opt = {
        lowercase: true,
        uppercase: true,
        numbers: false,
        symbols: false
    }
    Object.keys(options).map(key => {
        if (!isBoolean(options[key])) throw Error('should be boolean');
        opt[key] = options[key];
    })
    if (!Object.keys(opt).some(type => opt[type]))
        throw new Error('At least one option must be true');
    const possibleCombinations = getPossibleCombinations(opt);
    return {
        possibleCombinations,
        opt
    };
}

const getAllCombinations = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'
    const possibleCombinations = {
        lowercase,
        uppercase,
        numbers,
        symbols
    }
    return possibleCombinations;
}
const getPossibleCombinations = (options) => {
    const allCombinations = getAllCombinations();
    const mappedValues = Object.keys(options).map(type=> options[type] ? allCombinations[type] : '');
    return mappedValues.join('');
}

module.exports = {
    generateRandomPassword
}
