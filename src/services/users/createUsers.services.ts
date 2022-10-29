import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";

import Users from "../../entities/users.entity";

import { IUserRequest } from "../../interfaces/users";

import { hash } from "bcryptjs";

export const createUserService = async ({name, email, avatar, password }:IUserRequest): Promise<Users> =>{
    const usersRepository = AppDataSource.getRepository(Users)
    const users = await usersRepository.find()

    const emailAlreadyExists:any = users.find(user => user.email === email)
    
    if(emailAlreadyExists){
        throw new AppError('Email already exists', 400)
    }

    const hashPassword = await hash(password, 10)

    const user = usersRepository.create({
        name, email, avatar, password: hashPassword
    })

    await usersRepository.save(user)
    return user
}
