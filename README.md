  

# Random Password Generator

  

> An easiest solution for generating a secure and reliable random password with optional configurations. 


## Install

```bash
$ npm install random-secure-password-generator
```

## Usage

#### `generateRandomPassword(options)`

Generate a random and secured password with the given options.

```javascript
const { generateRandomPassword } = require('random-secure-password-generator');

const password = generateRandomPassword();
console.log(password); // 'EiMuClFE'

//or

const password = generateRandomPassword({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true
}, 10, true);

console.log(password); // '$/s+B8k17_'
```

## Parameters
### options {object}
Any of these can be passed into the options object for each function.

| Name  | Description                            | Default Value |
| ----- | -------------------------------------- | ------------- |
| lowercase        | Boolean, length of password.               | true  |
| uppercase        | Boolean, put numbers in password.          | true  |
| numbers          | Boolean, put symbols in password.          | false |
| symbols          | Boolean, put lowercase in password         | false |
 
### length {number}
Description: For setting the length of the password. Default value is 8.
### strict {boolean}
Description: If set true, enables strict mode for at least having one character from each set. Default value is false

```