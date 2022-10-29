import { Router } from 'express'

import { createUserController, listAllUsersController } from '../controllers/users.controllers'

import validationSchemaMiddleware from '../middlewares/validationSchema.middleware'

import { UserSchema } from '../schemas/users.schema'

const usersRouter = Router()

usersRouter.post('',validationSchemaMiddleware(UserSchema),createUserController)
usersRouter.get('',listAllUsersController)
usersRouter.patch('/:id')
usersRouter.delete('/:id')

export default usersRouter