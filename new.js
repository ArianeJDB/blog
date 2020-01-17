const app = require('../app.js');
const fs = require('fs');
const https = require('https');

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(3443, () => {
    console.log('CONECTADO a https 3443')
})