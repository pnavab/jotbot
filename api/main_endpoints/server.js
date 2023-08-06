const { HttpServer } = require("../util/HttpServer");

function main() {
  const API_ENDPOINTS = [
    __dirname + '/routes/',
  ]; 
  const mainEndpointServer = new HttpServer(API_ENDPOINTS, 7000);
  mainEndpointServer.initializeEndpoints().then(() => {
    mainEndpointServer.openConnection();
  });
}

main();