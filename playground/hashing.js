const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const objToSign = {
  data: 'Some data value'
};

const token = jwt.sign(objToSign, 'abc123');
console.log(token);
const decoded = jwt.verify(token, 'abc123');
console.log(decoded);

// const pswd = 'abc123';
// const hash = SHA256(pswd);

// console.log(`Password: ${pswd}`);
// console.log(`Hash: ${hash}`);


