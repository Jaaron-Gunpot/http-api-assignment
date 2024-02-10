const http = require('http');
const query = require('querystring');
const htmlHandler = require('./htmlHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  // '/success':,
  // '/badRequest':,
  // '/unauthorized':,
  // '/forbidden':,
  // '/internal':,
  // '/notimplemented':,
  // 'notFound':
};
const onRequest = (request, response) => {
  // make the url object to do stuff with
  const parsedUrl = new URL(request.url);
  console.log(parsedUrl.pathname);

  // grab the accept headers
  const acceptedTypes = request.headers.accept.split(',');
  // if the url is defined in the urlStruct object,it goes there. If not, it goes to the index page
  if (urlStruct[parsedUrl.pathname]) {
    // only functions with three arguments care about the third one
    // the functions that only take request and response don't care about the third
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
  } else {
    urlStruct['/'](request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`listening on 127.0.0.1:${port}`);
});
