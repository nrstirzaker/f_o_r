'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const appConfig = require('./appConfig.js');
var port = process.env.PORT || 8080; // set our port

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({ port: port });




// Add the route
server.route({
    method: 'GET',
    path:'/api/health', 
    handler: function (request, reply) {

        return reply('Health:Server is running');
    }
});

server.route({
    method: 'GET',
    path:'/api', 
    handler: function (request, reply) {

        return reply('Root:Server is running');
    }
});

server.route({
    method: 'POST',
    path:'/api/add', 
    handler: function (request, reply) {

        console.log( request.payload);

        reply('Hello ' + encodeURIComponent(request.payload.email) + '!');
    }
});



// Start the server
server.register(
    {
        register: require('inert')
    },
    function (err) {
        if (err) throw err

        server.start(function (err) {
            console.log('Server started at: ' + server.info.uri)
        })
    }
)


