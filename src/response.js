// main response function, all functions that send a response call this one
const respond = (request, response, status, content, type) => {
    response.writeHead(status, { 'Content-Type': type });
    response.write(content);
    response.end();
};

const success = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'This is working',
    };

    // if their first preference is xml, send xml
    //might be a good idea to make xml creating a function
    if (acceptedTypes[0] === 'text/xml') {
        const responseXML = '<response><message>This is working</message></response>';
        return respond(request, response, 200, responseXML, 'text/xml');
    }

    // if they did not want xml, default to json
    const acceptableJson = JSON.stringify(responseJSON);
    return respond(request, response, 200, acceptableJson, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
    //since we only care about the valid parameter for this endpoint, we can just grab that
    const valid = params.valid;

    const responseJSON = {
        message: 'This request has the required parameters',
    };

    //if valid does not exist or is not true, send 400
    if (!valid || valid !== 'true') {
        //send failure xml if they want it
        if (acceptedTypes[0] === 'text/xml') {
            const responseXML = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
            return respond(request, response, 400, responseXML, 'text/xml');
        }
        //send failure json
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';
        const acceptableJson = JSON.stringify(responseJSON);
        return respond(request, response, 400, acceptableJson, 'application/json');
    };

    //since we know that it is valid now, check if they want xml
    if (acceptedTypes[0] === 'text/xml') {
        const responseXML = '<response><message>This request has the required parameters</message></response>';
        return respond(request, response, 200, responseXML, 'text/xml');
    }

    //send default json
    const acceptableJson = JSON.stringify(responseJSON);
    return respond(request, response, 200, acceptableJson, 'application/json');
};

//basically the same as badRequest, but with 401 instead of 400
const unauthorized = (request, response, acceptedTypes, params) => {
    //since we only care about the loggedIn parameter for this endpoint, we can just grab that
    const loggedIn = params.loggedIn;

    const responseJSON = {
        message: 'You have access to the content',
    };

    //if loggedIn does not exist or is not true
    //since loggedIn is a string it can be used as a falsy value and not need to be a boolean
    if (!loggedIn || loggedIn !== 'yes') {
        //send failure xml if they want it
        if (acceptedTypes[0] === 'text/xml') {
            const responseXML = '<response><message>You are not logged in</message><id>unauthorized</id></response>';
            return respond(request, response, 401, responseXML, 'text/xml');
        }
        //send failure json
        responseJSON.message = 'You are not logged in';
        responseJSON.id = 'unauthorized';
        const acceptableJson = JSON.stringify(responseJSON);
        return respond(request, response, 401, acceptableJson, 'application/json');
    };

    //since we know that it is valid now, check if they want xml
    if (acceptedTypes[0] === 'text/xml') {
        const responseXML = '<response><message>You have access to the content</message></response>';
        return respond(request, response, 200, responseXML, 'text/xml');
    }

    //send default json
    const acceptableJson = JSON.stringify(responseJSON);
    return respond(request, response, 200, acceptableJson, 'application/json');
};

//consistent error area

const notFound = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    };
    // if their first preference is xml, send xml
    if (acceptedTypes[0] === 'text/xml') {
        const responseXML = '<response><message>This is working</message></response>';
        return respond(request, response, 200, responseXML, 'text/xml');
    }
    const acceptableJson = JSON.stringify(responseJSON);
    return respond(request, response, 404, acceptableJson, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'You do not have access to this content',
        id: 'forbidden',
    };

    // if their first preference is xml, send xml
    if (acceptedTypes[0] === 'text/xml') {
        const responseXML = '<response><message>This is working</message></response>';
        return respond(request, response, 200, responseXML, 'text/xml');
    }

    const acceptableJson = JSON.stringify(responseJSON);
    return respond(request, response, 403, acceptableJson, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'Internal Server Error. Something went wrong',
        id: 'internalError',
    };
    // if their first preference is xml, send xml
    if (acceptedTypes[0] === 'text/xml') {
        const responseXML = '<response><message>This is working</message></response>';
        return respond(request, response, 200, responseXML, 'text/xml');
    }
    const acceptableJson = JSON.stringify(responseJSON);
    return respond(request, response, 500, acceptableJson, 'application/json');
};

const notimplemented = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'This feature has not been implemented yet',
        id: 'notImplemented',
    };

    // if their first preference is xml, send xml
    if (acceptedTypes[0] === 'text/xml') {
        const responseXML = '<response><message>This is working</message></response>';
        return respond(request, response, 200, responseXML, 'text/xml');
    }

    const acceptableJson = JSON.stringify(responseJSON);
    return respond(request, response, 501, acceptableJson, 'application/json');
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    notFound,
    forbidden,
    internal,
    notimplemented
};
