import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/task.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'
const router = Router()

router.get('/tasks', authRequired, getTasks) //obtener
router.get('/tasks/:id', authRequired, getTask) //obtener 1 solo
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask) //crear
router.delete('/tasks/:id', authRequired, deleteTask) //eliminar 1 solo
router.put('/tasks/:id', authRequired, updateTask) //actualizar 1 solo

export default router