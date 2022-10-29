import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";

import Users from "../../entities/users.entity";
import Posts from "../../entities/posts.entity";

export const createPostService = async (userId:string , post:string): Promise<Posts> =>{
    const usersRepository = AppDataSource.getRepository(Users)
    const user = await usersRepository.findOne({
        where: {
            id: userId 
        }
    });

    if(!user){
        throw new AppError('Invalid user id', 400)
    }
    
    const postsRepository = AppDataSource.getRepository(Posts)
    const postCreated = postsRepository.create({
        post,
        user: user!
    })

    await postsRepository.save(postCreated)
    return postCreated
}

