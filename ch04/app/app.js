const http = require('http');
const os = require('os');

const increaseFunc = (function() {

  let requestNum = 0;

  return function () {
    return ++requestNum;
  }

})();

console.log("Kubia unhealthy server starting...");

var handler = function(request, response){
  const requestNum = increaseFunc();
  if(requestNum > 5) {
    console.log("request times - " + requestNum);
    response.writeHead(500);
    response.end("You're request is over 5 times!"); 
  }
  console.log("Received request from " + request.connection.remoteAddress);
  response.writeHead(200);
  response.end("You've hit " + os.hostname() + "\n");
};

var www = http.createServer(handler);

www.listen(8080);
