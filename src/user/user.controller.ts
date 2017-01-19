import { Request, Response } from 'express';
import { UserModel } from './user.model';

const User = new UserModel().getModel().user;

export function getUsers(req: Request, res: Response): void {
    res.json({message: 'Getting all users...'});
}

export function seedUsers(req: Request, res: Response): void {
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
