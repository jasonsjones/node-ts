import { Request, Response } from 'express';
import { UserModel } from './user.model';

export class UserController {
    private static userModel = new UserModel().getModel().user;

    public static getUsers(req: Request, res: Response): void {
        res.json({message: 'Getting all users...'});
    }

    public static seedUsers(req: Request, res: Response): void {
        let User = UserController.userModel;
        User.find({}).exec()
            .then(collection => {
                if (collection && collection.length === 0) {
                    // create users here...
                    res.json({message: 'seeding users in database'})
                }
            },
            () => {
                console.log('promise rejected');
            })
            .catch(err => {
                console.log('error: ' + err);
            });
    }
}
