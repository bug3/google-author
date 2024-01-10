const decodeMigrationURI = require('./src/decodeMigrationURI');

const uri = 'otpauth-migration://offline?data=';

decodeMigrationURI(uri)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
