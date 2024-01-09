const protobuf = require('protobufjs');

const protoFile = 'migration_data.proto';
const uri = 'otpauth-migration://offline?data=';

if (typeof uri !== 'string' || !uri.includes('data')) {
    throw Error('Invalid URI: Data parameter not found');
}

protobuf.load(protoFile, (loadError, root) => {
    if (loadError) {
        throw loadError;
    }

    const message = root.lookupType('otpauth.MigrationData');
    const payload = Buffer.from(new URL(uri).searchParams.get('data'), 'base64');
    const verifyError = message.verify(payload);

    if (verifyError) {
        throw Error(verifyError);
    }

    const decodedMessage = message.decode(payload);
    const messageObject = message.toObject(decodedMessage, {
        longs: String,
        enums: String,
        bytes: String
    });

    console.log(messageObject.otpParams);
});
