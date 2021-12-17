const express = require('express');
const http = require('http');

const AppConfig = require('./config/appConfig');
const Routes = require('./routes');

class Server {
    constructor() {
        this.app = express();

        const HTTP_SERVER_ERROR = 500;
        this.app.use(function (err, req, res, next) {
            if (res.headersSent) {
                return next(err);
            }

            return res.status(err.status || HTTP_SERVER_ERROR).render('500');
        });

        this.http = http.Server(this.app);
    }

    appConfig() {
        new AppConfig(this.app).includeConfig();
    }

    includeRoutes() {
        new Routes(this.app).routesConfig();
    }

    startTheServer() {
        this.appConfig();
        this.includeRoutes();

        const port = process.env.NODE_SERVER_PORT || 3000;
        const host = process.env.NODE_SERVER_HOST || '0.0.0.0';

        this.http.listen(port, host, () => {
            console.log(`Listening on http://${host}:${port}`);
        });

    }
}

module.exports = new Server();