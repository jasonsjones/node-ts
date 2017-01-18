import { Request, Response } from 'express';
import UserModel from './user.model';

export function getUsers(req: Request, res: Response): void {
    res.json({message: 'Getting all users...'});
}

export function seedUsers(req: Request, res: Response): void {
    UserModel
        .find({})
        .exec((err, collection) => {
            if (err) {
                console.log('Ooops...there is an error getting the users...');
                res.status(500).send(err);
            }

            if (collection && collection.length === 0) {
                // create users here...
                res.json({message: 'seeding users in database'})
            } else {
                console.log('database already contains a collection of users...');
                res.json({message: 'database contains users...'});
            }
        });
}
