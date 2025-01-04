const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers); //printing request datas to the console
  res.setHeader("Content-Type", "text/html"); //setting a response header
  res.write(
    "<html><head><title>My First Page</title></head><body><h1>Hello Hello From The Server!</h1></body></html>" //writing a response
  );
  res.end(); //ending a response
});

server.listen(3000);
