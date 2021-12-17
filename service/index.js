const DotEnv = require('dotenv');
DotEnv.config();

const Server = require('./app');

Server.startTheServer();