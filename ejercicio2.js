const crypto = require('crypto');
Object.keys(crypto);

const randomID = crypto.randomBytes(8).toString('hex');
console.log(randomID);
