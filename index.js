const decodeMigrationURI = require('./src/decodeMigrationURI');
const syncPromise = require('synchronized-promise');

const decodeMigrationURISync = (migrationURI) => syncPromise(decodeMigrationURI)(migrationURI);

module.exports.decodeMigrationURI = decodeMigrationURI;
module.exports.decodeMigrationURISync = decodeMigrationURISync;
