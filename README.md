# [google-author](https://github.com/bug3/google-author)

A tool to obtain secret keys from Google Authenticator.

## Installation

```bash
npm install google-author
```

## Usage

-   **Get migration URI from QR code image**:

Google Authenticator App > Transfer accounts > Export accounts > Take screenshot and save file image

```javascript
const googleAuthor = require('google-author');

const qrCodeImageFile = 'qrCode.jpg';

googleAuthor.convertQRCode(qrCodeImageFile).then((migrationURI) => {
    console.log(migrationURI); // otpauth-migration://offline?data=data
}).catch((error) => {
    console.error(error);
});
```
OR

```javascript
const googleAuthor = require('google-author');

const qrCodeImageFile = 'qrCode.jpg';

console.log(googleAuthor.convertQRCodeSync(qrCodeImageFile)); // otpauth-migration://offline?data=data
```

-   **Get secret data**:

```javascript
const googleAuthor = require('google-author');

const migrationURI = 'otpauth-migration://offline?data=data';

googleAuthor.decodeMigrationURI(migrationURI).then((data) => {
    console.log(data);
    /*
    [
        {
            secret: 'aWtpIGtpxZ9pbmluIGJpbGRpxJ9pIHPEsXIgZGXEn2lsZGly',
            name: 'test@email.com',
            issuer: 'bug3',
            hash: 'SHA1',
            digits: 'SIX',
            type: 'TOTP',
            sharedSecret: 'SECRET'
        },
        ...
    ]
    */
}).catch((error) => {
    console.error(error);
});
```

OR

```javascript
const googleAuthor = require('google-author');

const migrationURI = 'otpauth-migration://offline?data=data';

console.log(googleAuthor.decodeMigrationURISync(migrationURI));
/*
[
    {
        secret: 'aWtpIGtpxZ9pbmluIGJpbGRpxJ9pIHPEsXIgZGXEn2lsZGly',
        name: 'test@email.com',
        issuer: 'bug3',
        hash: 'SHA1',
        digits: 'SIX',
        type: 'TOTP',
        sharedSecret: 'SECRET'
    },
    ...
]
*/
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
