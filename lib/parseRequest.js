const fs = require("fs");

function parseRequest(request, response, body) {
  request.body = Buffer.concat(body).toString("utf-8");

  response.status = (newStatus) => {
    response.statusCode = newStatus;
    return response;
  };

  response.sendFile = (url) => {
    fs.createReadStream(url).pipe(response);
  };

  response.json = (data) => {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(data));
  };

  response.text = (data) => {
    response.setHeader("Content-Type", "text/plain");
    response.end(data);
  };

  // parseando el query en la url :
  const query = {};
  let urlSplited = [];
  let queryUnparsed = "";

  if (request.url.includes("?")) {
    urlSplited = request.url.split("?");
    queryUnparsed = urlSplited[1].split("&");

    queryUnparsed.forEach((el) => {
      const elSplited = el.split("=");
      query[elSplited[0]] = elSplited[1];
    });

    request.url = urlSplited[0];
    request.query = query.length ? query : "";
  }
  else {
    request.query = "";
  }
}

module.exports = { parseRequest };

