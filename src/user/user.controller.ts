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
                    UserController.createUsers().then((result) => {
                        if (result.success) {
                            res.json(result);
                        }
                    });
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

    private static createUsers(): Promise<any> {
        return new Promise(function (resolve, reject) {
            mockUsers.forEach(function (user, idx, arr) {
                User.create(user, function (err) {
                    if (err) {
                        reject({
                            success: false,
                            message: 'error seeding database'
                        });
                    }
                    if (idx === arr.length - 1) {
                        resolve({
                            success: true,
                            message: 'seeding users in database'
                        });
                    }
                });
            });
        });
    }
}
