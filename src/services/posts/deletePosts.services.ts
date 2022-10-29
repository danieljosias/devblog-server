import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";
import Users from '../../entities/users.entity'
import AppError from "../../errors/AppError";

export const deletePostService = async (postId:string, id:string) =>{
    const postsRepository = AppDataSource.getRepository(Posts)

    const posts = await postsRepository.findOne({
        where: { 
            id: postId
        },
        relations:{
            user: true
        }
    });
    
    if(posts?.user.id !== id){
        throw new AppError('Unauthorized',401)
    }

    await postsRepository.delete(posts!.id)
 
    return true
}


