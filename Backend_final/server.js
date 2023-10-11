
const http = require('https')
const app = require('./app')
const fs = require('fs')
const PORT = 3000 

const server = http.createServer(
    {
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    }, app
);  

server.on('error', (error) => {
    console.error('Server error:', error);
  });

server.listen(PORT) 