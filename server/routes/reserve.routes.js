import { Router } from 'express'
import express from 'express'
import { createReserva } from '../controllers/reserve.controller.js'

const router = Router()

router.post('/reservation', createReserva)

export default router