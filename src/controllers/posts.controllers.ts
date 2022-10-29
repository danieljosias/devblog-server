import { Request, Response } from 'express'

import { createPostService } from '../services/posts/createPosts.services';
import { listAllPostsService } from '../services/posts/listAllPosts.services';
import { updatePostService } from '../services/posts/updatePosts.services'
import { deletePostService } from '../services/posts/deletePosts.services';

import { IPostRequest } from '../interfaces/posts'

let id = ''
export const createPostsController = async (req: Request, res: Response) =>{
    const { post, userId }:IPostRequest = req.body
    id = userId

    const posts = await createPostService(userId,post)
    return res.status(201).send({posts: posts})
}

export const listAllPostsController = async (req: Request, res: Response) =>{
    const posts = await listAllPostsService()
    return res.status(200).send({posts: posts})
}

export const updatePostsController = async (req: Request, res: Response) =>{
    const post = req.body.newPost
    const postId = req.params.id

    const posts = await updatePostService(post,postId,id)
    return res.status(200).send({updatedPost: posts})
}

export const deletePostsController = async (req: Request, res: Response) =>{
    const postId  = req.params.id

    const posts = await deletePostService(postId, id)
    return res.status(200).send({deletedPost: posts})
}