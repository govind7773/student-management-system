const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '771058827984-2sdi6cj8cka40224ftqaskl0iho9rb15.apps.googleusercontent.com';
const CLIENT_SECRET = 'w-nGttfmW4hAI11XHuXvB2QN';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//048iKW3urM9gGCgYIARAAGAQSNwF-L9IrSsJAEDA21JeI6TzlBsoA02mXUURN4e3t1CPOmhtMiASf3P7O12MB-0AQQAtIKIubKHs';


const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2client
})

const filepath = path.join(__dirname, '/img/user.png');

async function uploadfile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'userlogo.png',
                mimetype: 'image/png'
            },
            media: {
                mimetype: 'image/png',
                body: fs.createReadStream(filepath)
            }
        });
        console.log(response.data);

    } catch (err) {
        console.log(err.message);
    }
}
uploadfile();