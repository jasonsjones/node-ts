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
        this.router.route('/')
            .get(UserController.getUsers)
            .post(UserController.addUser);

        this.router.route('/:id')
            .get(UserController.getSingleUser)
            .delete(UserController.removeUser);
    }
}

export default new UserRoute().getRouter();
