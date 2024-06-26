const protobuf = require('protobufjs');
const base32 = require('base32.js');

const protoFile = `${ __dirname }/../migration_data.proto`;

module.exports = async (uri) => await new Promise((resolve, reject) => {
    protobuf.load(protoFile, (loadError, root) => {
        try {
            if (typeof uri !== 'string' || !uri.includes('data')) {
                reject('Invalid URI: Data parameter not found');
            }

            if (loadError) {
                reject(loadError);
            }

            const message = root.lookupType('otpauth.MigrationData');
            const payload = Buffer.from(new URL(uri).searchParams.get('data'), 'base64');
            const verifyError = message.verify(payload);

            if (verifyError) {
                reject(verifyError);
            }

            const decodedMessage = message.decode(payload);
            const messageObject = message.toObject(decodedMessage, {
                longs: String,
                enums: String,
                bytes: String
            });

            resolve(
                messageObject.otpParams.map((item) => ({
                    ...item,
                    sharedSecret: new base32.Encoder().write(Buffer.from(item.secret, 'base64')).finalize()
                }))
            );
        } catch (error) {
            reject(error);
        }
    });
});
