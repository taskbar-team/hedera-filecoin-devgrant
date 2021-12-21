const bodyParser = require('body-parser');
const unhandledRejections = new Map();
class AppConfig {
    constructor(app) {
        process.on('unhandledRejection', (reason, p) => {
            console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
            unhandledRejections.set(p, reason);
            process.exit(1)
        });
        process.on('rejectionHandled', (promise) => {
            unhandledRejections.delete(promise);
        });
        this.app = app;
    }

    includeConfig() {
        this.loadAppLevelConfig();
    }

    loadAppLevelConfig() {
        this.app.use(
            bodyParser.json(),
            bodyParser.urlencoded({ extended: true }),
        );
        require("../responseHandler");
    }

}

module.exports = AppConfig;