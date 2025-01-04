const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write(
      '<html><head><title>Enter Message</title></head><body><form action="/message" method="POST"><input type = "text" name = "message"><button type="submit">Send</button></form></body></html>'
    );
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      console.log(chunk); //the output here can not be used, it will be a stream of data.
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString(); //getting the data the user entered.
      console.log(parsedBody); //the output here will be "message=<your message>" because the name of the input field was 'message' in html. Key-Value Pair.
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('messages.txt', message);
      res.statusCode = 301;
      res.setHeader('Location', '/'); //redirects the request back to the form part
      return res.end();
    });
  }

  res.setHeader('Content-Type', 'text/html'); //setting a response header
  res.write(
    '<html><head><title>My First Page</title></head><body><h1>Hello Hello From The Server!</h1></body></html>' //writing a response
  );
  res.end(); //ending a response
});

server.listen(3000);
