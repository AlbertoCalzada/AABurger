import { Router } from 'express'
import { login, register, logout, profile } from '../controllers/auth.controller.js'
import {authRequired} from '../middlewares/validateToken.js'
const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.get('/profile', authRequired, profile ) //Para el perfil del usuario, antes se tendra que logear para que tenga efecto


export default router