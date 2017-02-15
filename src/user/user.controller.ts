import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { User as MainModel } from './user.model';
import { IUserModel } from './user.interfaces';

export class UserController {

    private static User: Model<IUserModel> = MainModel;

    public static setModel(model: Model<IUserModel>): void {
        UserController.User = model;
    }

    public static getUsers(req: Request, res: Response, next: NextFunction): void {
        let User = UserController.User;
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
        let User = UserController.User;
        User.findById(req.params.id).exec()
            .then(user => {
                if (user) {
                    res.json({
                        success: true,
                        payload: user
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'User not found',
                        payload: null
                    });
                }
                next();
            })
            .catch(err => {
                next(err);
            });
    }

    public static addUser(req: Request, res: Response, next: NextFunction): void {
        let User = UserController.User;
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

    public static removeUser(req: Request, res: Response, next: NextFunction): void {
        let User = UserController.User;
        User.findByIdAndRemove(req.params.id).exec()
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
