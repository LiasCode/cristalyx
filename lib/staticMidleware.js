const path = require("path");

function staticMiddleware(route = "") {
  return (req, res) => {
    const { url } = req;

    const plublicFolder = route;

    let urlOfFile = path.join(
      process.cwd(),
      plublicFolder,
      url.split(`/${plublicFolder}`)[1]
    );

    res.sendFile(urlOfFile);
  };
}

module.exports = { staticMiddleware };
