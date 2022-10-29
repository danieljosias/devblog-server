import AppDataSource from "../../data-source";
import jwt from 'jsonwebtoken'
import AppError from "../../errors/AppError";
import 'dotenv/config'
import { ILoginRequest } from "../../interfaces/login";
import Users from "../../entities/users.entity";
import { compare } from 'bcryptjs'

export const createLoginService = async ({email, password}:ILoginRequest):Promise<string> => {
    const usersRepository = AppDataSource.getRepository(Users)
    const users = await usersRepository.findOne({
        where:{
            email
        }
    })
    
    if(!users){
        throw new AppError('Invalid email', 403)
    }

    const matchPassword = await compare(password, users?.password)
    if(!matchPassword){
        throw new AppError('Password invalid', 403)
    }

    const token = jwt.sign(
        {
            
        },
        process.env.JWT_SECRET as string,
        {
            subject: users.id,
            expiresIn: '1d'
        }
    )
    
    return token
}
