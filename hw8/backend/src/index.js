import server from './server.js';

import mongo from './mongo.js';

mongo.connect();

const port = process.env.PORT || 4000;

server.listen({port}, () => {
    console.log(`Listening on http://localhost:${port}`);
});