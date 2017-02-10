import { Request, Response, NextFunction } from 'express';
import { User } from './user.model';

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

    public static addUser(req: Request, res: Response, next: NextFunction): void {
        let newUser = new User(req.body);

        newUser.save()
            .then(user => {
                res.status(201);
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
