'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const fs = require('fs');

const lt = fs.readFileSync('app/left_tit.txt', 'utf-8').split(/\n/);
const rt = fs.readFileSync('app/right_tit.txt','utf-8').split(/\n/);

server.connection({port: 3000, host: 'localhost'});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        let out = [];
        for (let i = 0; i < lt.length; i++) {
            out[i] = lt[i] + rt[i];
        }
        reply(out);
    }
});

server.route({
    method: 'GET',
    path: '/{side}',
    handler: function (request, reply) {
        let side_of_tits = encodeURIComponent(request.params.side);
        switch (side_of_tits) {
            case 'left':
                reply(lt);
                break;
            case 'right':
                reply(rt);
                break;
            default:
                reply(side_of_tits);
                break;
        }
    }
});

server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
});
