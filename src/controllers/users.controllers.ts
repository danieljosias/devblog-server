import { Request, Response } from 'express'
import { instanceToPlain } from "class-transformer";

import { createUserService } from '../services/users/createUsers.services';
import { listAllUsersService } from '../services/users/listAllUsers.services';

import { IUserRequest } from '../interfaces/users';

export const createUserController = async (req: Request, res: Response) =>{
    const { name, email, avatar, password }:IUserRequest = req.body
    
    const users = await createUserService({name, email, avatar, password})
    return res.status(201).send(instanceToPlain({users: users}))
}

export const listAllUsersController = async (req: Request, res: Response) =>{
    const users = await listAllUsersService()
    return res.status(201).send(instanceToPlain({users: users}))
}
