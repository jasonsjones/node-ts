import { Request, Response, NextFunction } from 'express';
import { User } from './user.model';

import  mockUsers from './user.mock.data';

export class UserController {

    public static getUsers(req: Request, res: Response, next: NextFunction): void {
        User.find({}).exec()
            .then(users => {
                res.json({
                    success: true,
                    payload: users
                });
                next();
            })
            .catch(err => {
                next(err);
            });
    }

    public static getSingleUser(req: Request, res: Response, next: NextFunction): void {
        User.findById(req.params.id).exec()
            .then(user => {
                res.json({
                    success: true,
                    payload: user
                });

                next();
            })
            .catch(err => {
                next(err);
            });
    }
}
