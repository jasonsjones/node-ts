import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';

import IndexRoute from '../base/index.route';
import UserRoute from '../user/user.route';

class App {

    private express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.initRoutes();
    }

    public getExpressApp(): express.Application {
        return this.express;
    }

    public middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        if (process.env.NODE_ENV !== 'test') {
            this.express.use(logger('dev'));
        }
    }

    public initRoutes(): void {
        this.express.use('/', IndexRoute);
        this.express.use('/users', UserRoute);
    }
}

export default new App().getExpressApp();
