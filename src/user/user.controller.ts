import { Request, Response, NextFunction } from 'express';
import { User } from './user.model';

import  mockUsers from './user.mock.data';

export class UserController {

    public static getUsers(req: Request, res: Response): void {
        res.json({message: 'Getting all users...'});
    }

    public static seedUsers(req: Request, res: Response, next: NextFunction): void {
        User.find({}).exec()
            .then(collection => {
                if (collection && collection.length === 0) {
                    // create users here...
                } else {
                    res.json({
                        success: true,
                        payload: collection
                    });
                }
                next();
            })
            .catch((err) => {
                console.log('Oops...we had an error');
                next(err);
            });
    }
}
