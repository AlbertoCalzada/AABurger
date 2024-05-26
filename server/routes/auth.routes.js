import { Router } from 'express'
import { login, register, logout, profile, getUser } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'
const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)

//router.get('/profile', authRequired , profile)

router.get('/profile',  profile) //Para el perfil del usuario, antes se tendra que logear para que tenga efecto, protegemos la ruta
router.get('/user/:id', getUser);

export default router