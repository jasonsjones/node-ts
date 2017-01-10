import { Request, Response } from 'express';

export function getIndex(req: Request, res: Response): void {
    res.json({message: 'Hello API from typescript!'});
}
