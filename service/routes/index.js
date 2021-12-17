const trimRequest = require('trim-request');

class Routes {
    constructor(app) {
        this.app = app;
    }

    /* creating app Routes starts */
    appRoutes() {
        this.app.use('/storage', trimRequest.all, require('./storage'));
    }


    routesConfig() {
        this.appRoutes();
    }
}

module.exports = Routes;