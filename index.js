const decodeMigrationURI = require('./src/decodeMigrationURI');
const syncPromise = require('synchronized-promise');

const uri = 'otpauth-migration://offline?data=';

decodeMigrationURI(uri)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));

console.log(syncPromise(decodeMigrationURI)(uri));
