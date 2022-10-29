import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import Posts from "../../entities/posts.entity";

export const updatePostService = async (post:string, postId:string, id: string):Promise<any> => {

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

    await postsRepository.update(posts!.id,{post: post})
 
    return true
}
