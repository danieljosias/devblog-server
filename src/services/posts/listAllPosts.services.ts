import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";

export const listAllPostsService = async () => {
    const postsRepository = AppDataSource.getRepository(Posts)
    const posts = await postsRepository.find()

    return posts
}
