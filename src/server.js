const http = require('http');
const query = require('querystring');
const url = require('url');
const htmlHandler = require('./htmlHandler.js');
const responseHandler = require('./response.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,
};
const onRequest = (request, response) => {
  // make the url object to do stuff with
  const parsedUrl = url.parse(request.url);

  // grab the accept headers
  const acceptedTypes = request.headers.accept.split(',');
  const queryParams = query.parse(parsedUrl.query);
  // if the url is defined in the urlStruct object,it goes there. If not, it goes to the index page
  if (urlStruct[parsedUrl.pathname]) {
    // only functions with three arguments care about the third one
    // the functions that only take request and response don't care about the third
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, queryParams);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`listening on 127.0.0.1:${port}`);
});
