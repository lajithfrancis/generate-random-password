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
 * @returns 
 */
const gerenateRandomPassword = (options, length = 10) => {
    const pool = getPool(options)
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomNumber = random(1, pool.length - 1)
        password += pool[randomNumber];
        
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
    return possibleCombinations;
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
    gerenateRandomPassword
}