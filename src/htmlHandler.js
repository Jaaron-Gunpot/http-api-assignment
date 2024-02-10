const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/client.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, reponse) => {
  reponse.writeHead(200, { 'Content-Type': 'text/css' });
  reponse.write(css);
  response.end();
};

module.exports.getCSS = getCSS;
module.exports.getIndex = getIndex;
