const path = require("path");

function staticFiles(route = "") {
  return (req, res) => {
    const { url } = req;

    const plublicFolder = route;

    const urlOfFile = path.join(
      process.cwd(),
      plublicFolder,
      url.split(`/${plublicFolder}`)[1]
    );

    res.sendFile(urlOfFile);
  };
}

module.exports = { staticFiles };
