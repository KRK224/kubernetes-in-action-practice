// app with version
const http = require('http');
const os = require('os');
const fs = require('fs');
const dataFile = '/var/data/kubia.txt';

console.log('Kubia server starting...');

function fileExists(file) {
  try {
    fs.statSync(file);
    
    return true;
  } catch (e) {
    return false;
  }
}

var handler = function (request, response) {
  if (request.method == 'POST') {
    const file = fs.createWriteStream(dataFile);
    file.on('open', function (fd) {
      request.pipe(file);
      console.log('New data has been received and stored');
      response.writeHead(200);
      response.end('Data stored on pod ' + os.hostname() + '\n');
    });
  } else {
    var data = fileExists(dataFile)
      ? fs.readFileSync(dataFile, 'utf8')
      : 'No data posted yet';
    response.writeHead(200);
    response.write("You'be hit " + os.hostname() + '\n');
    response.end('Data stored on this pod: ' + data + '\n');
  }
};

var www = http.createServer(handler);

www.listen(8080);
