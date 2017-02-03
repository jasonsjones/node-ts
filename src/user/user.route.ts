import { Router, Request, Response } from  'express';
import { UserController } from './user.controller';

class UserRoute {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    public initRoutes(): void {
        this.router.get('/', UserController.getUsers);
        // this.router.get('/seedUsers', UserController.seedUsers);
    }
}

export default new UserRoute().getRouter();
