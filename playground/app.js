const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const chunks = [];

  req.on('data', (chunk) => {
    console.log('On Data');
    chunks.push(chunk);
  });

  req.on('end', () => {
    if (req.url === '/data') {
      console.log(chunks);
      res.write('Hello world!')
      res.write(chunks.join(''));
      res.end();
      return;
    }
  });

  if (req.url === '/ping') {
    res.write('pong');
    res.end();
    return;
  }
  
  // res.write('Route not found');
  // res.end();
  return;
});

server.listen(3000, 'localhost', () => {
  console.log('Server up on port 3000');
});
