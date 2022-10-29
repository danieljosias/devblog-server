import { Router } from 'express'

import { createLoginController } from '../controllers/login.controllers'

import { loginSchema } from '../schemas/login.schema'

import validationSchemaMiddleware from '../middlewares/validationSchema.middleware'

const loginRouter = Router()
loginRouter.post('', validationSchemaMiddleware(loginSchema), createLoginController)

export default loginRouter