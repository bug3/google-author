# [google-auth-secrets](https://github.com/bug3/google-auth-secrets)

A tool to obtain secret keys from Google Authenticator.

## Installation

```bash
npm install google-auth-secrets
```

## Usage

-   **Get migration URI from QR code image**:

Google Authenticator App > Transfer accounts > Export accounts > Take screenshot and save file image

```javascript
const googleAuthSecrets = require('google-auth-secrets');

const qrCodeImageFile = 'qrCode.jpg';

googleAuthSecrets.convertQRCode(qrCodeImageFile).then((migrationURI) => {
    console.log(migrationURI); // otpauth-migration://offline?data=data
}).catch((error) => {
    console.error(error);
});
```
OR

```javascript
const googleAuthSecrets = require('google-auth-secrets');

const qrCodeImageFile = 'qrCode.jpg';

console.log(googleAuthSecrets.convertQRCodeSync(qrCodeImageFile)); // otpauth-migration://offline?data=data
```

-   **Get secret data**:

```javascript
const googleAuthSecrets = require('google-auth-secrets');

const migrationURI = 'otpauth-migration://offline?data=data';

googleAuthSecrets.decodeMigrationURI(migrationURI).then((data) => {
    console.log(data);
    /*
    [
        {
            secret: 'aWtpIGtpxZ9pbmluIGJpbGRpxJ9pIHPEsXIgZGXEn2lsZGly',
            name: 'test@email.com',
            issuer: 'bug3',
            hash: 'SHA1',
            digits: 'SIX',
            type: 'TOTP'
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
const googleAuthSecrets = require('google-auth-secrets');

const migrationURI = 'otpauth-migration://offline?data=data';

console.log(googleAuthSecrets.decodeMigrationURISync(migrationURI));
/*
[
    {
        secret: 'aWtpIGtpxZ9pbmluIGJpbGRpxJ9pIHPEsXIgZGXEn2lsZGly',
        name: 'test@email.com',
        issuer: 'bug3',
        hash: 'SHA1',
        digits: 'SIX',
        type: 'TOTP'
    },
    ...
]
*/
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
