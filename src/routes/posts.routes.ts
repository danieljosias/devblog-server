import { Router } from 'express'

import { createPostsController, listAllPostsController ,updatePostsController, deletePostsController } from '../controllers/posts.controllers'

import ensureAuthTokenMiddleware from '../middlewares/ensureAuthToken.middleware'

const postsRouter = Router()
postsRouter.post('', ensureAuthTokenMiddleware,createPostsController)
postsRouter.get('', listAllPostsController)
postsRouter.patch('/:id', ensureAuthTokenMiddleware, updatePostsController)
postsRouter.delete('/:id', deletePostsController)

export default postsRouter