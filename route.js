const fs = require('fs');

const requestHandle = (req, res) => {
    const url    = req.url;
    const method = req.method;

    if(url === '/form')
    {
        res.write("<html>");
        res.write("<head><title>Form Submit</title></head>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>");
        res.write("</html>");
        return res.end();
    }
    if(url === '/message' && method === 'POST')
    {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.writeHead('302', {Location: '/form'});
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Web App</title></head>');
    res.write('<body><h1>Welcome to Web App</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports.handle = requestHandle;