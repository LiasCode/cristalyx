const fs = require("fs");

function parseRequest(request, response, body) {
  body = Buffer.concat(body).toString("utf-8");
  request.body = body;

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

  // parseando el query en la url :
  let query = {};
  let urlSplited = [];
  let queryUnparsed = "";

  if (request.url.includes("?")) {
    urlSplited = request.url.split("?");
    queryUnparsed = urlSplited[1].split("&");

    queryUnparsed.forEach((el) => {
      let elSplited = el.split("=");
      query[elSplited[0]] = elSplited[1];
    });

    request.url = urlSplited[0];
    request.query = query.length ? query : "";
  } else {
    request.query = "";
  }
}

module.exports = { parseRequest };
