const http = require('http');
const os = require('os');

const increaseFunc = (function () {
  let requestNum = 0;
  return function () {
    return ++requestNum;
  };
})();

console.log('Kubia unhealthy server starting...');

var handler = function (request, response) {
  const requestNum = increaseFunc();
  console.log('Received request from ' + request.connection.remoteAddress);
  if (requestNum > 5) {
    console.log('request times - ' + requestNum);
    response.writeHead(500);
    response.end("Some Internal error has occurred! This is pod " + os.hostname() + '\n');
  }
  response.writeHead(200);
  response.end("This is v3 running in pod  " + os.hostname() + "\n");
};

var www = http.createServer(handler);

www.listen(8080);
