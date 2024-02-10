//main response function, all functions that send a response call this one
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};


const success = (request, response, acceptedTypes) => {
    const responseJSON ={
        message: 'This is working',
    };

    //if their first preference is xml, send xml
    if(acceptedTypes[0]=='text/xml'){
        const responseXML = '<response><message>This is working</message></response>';
        return respond(request, response, 200, responseXML, 'text/xml');
    };

    //if they did not want xml, default to json
    JSON.stringify(responseJSON);
    return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};