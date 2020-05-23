const http  = require('http');
const route = require('./route');

const server = http.createServer(route.handle);

server.listen(3000, () => {
    console.log('Server listening on port 3000');
})