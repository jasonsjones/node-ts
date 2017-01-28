import { Request, Response, NextFunction } from 'express';
import { User } from './user.model';

export class UserController {

    public static getUsers(req: Request, res: Response): void {
        res.json({message: 'Getting all users...'});
    }

    public static seedUsers(req: Request, res: Response, next: NextFunction): void {
        User.find({}).exec()
            .then(collection => {
                if (collection && collection.length === 0) {
                    // create users here...
                    res.json({message: 'seeding users in database'});
                } else {
                    res.json({users: collection});
                }
                next();
            })
            .catch((err) => {
                console.log('Oops...we had an error');
                next(err);
            });
    }
}
