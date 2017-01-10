import { Router, Request, Response } from  'express';
import * as IndexController from './index.controller';

class IndexRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    public initRoutes(): void {
        this.router.get('/', IndexController.getIndex);
    }
}

export default new IndexRouter().getRouter();
