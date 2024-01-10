const syncPromise = require('synchronized-promise');
const decodeMigrationURI = require('./src/decodeMigrationURI');
const convertQRCode = require('./src/convertQRCode');

const decodeMigrationURISync = (migrationURI) => syncPromise(decodeMigrationURI)(migrationURI);
const convertQRCodeSync = (qrImageFile) => syncPromise(convertQRCode)(qrImageFile);

module.exports.decodeMigrationURI = decodeMigrationURI;
module.exports.decodeMigrationURISync = decodeMigrationURISync;
module.exports.convertQRCode = convertQRCode;
module.exports.convertQRCodeSync = convertQRCodeSync;
