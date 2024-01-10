const fs = require('fs');
const jimp = require('jimp');
const QrCodeReader = require('qrcode-reader');

module.exports = async (qrImageFile) => await new Promise((resolve, reject) => {
    const imageFileBuffer = fs.readFileSync(qrImageFile);

    jimp.read(imageFileBuffer, (readError, image) => {
        try {
            if (readError) {
                reject(readError);
            }

            const qrCode = new QrCodeReader();

            qrCode.callback = (error, value) => {
                if (error) {
                    reject(error);
                }

                resolve(value.result);
            };

            qrCode.decode(image.bitmap);
        } catch (error) {
            reject(error);
        }
    });
});
