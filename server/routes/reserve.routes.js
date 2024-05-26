import { Router } from 'express'
import express from 'express'
import { createReserva, getReservas, getReservaById, updateReserva, deleteReserva } from '../controllers/reserve.controller.js'

const router = Router()

router.post('/reservation', createReserva)
router.get('/reservation', getReservas);
router.get('/reservation/:id', getReservaById);
router.put('/reservation/:id', updateReserva);
router.delete('/reservation/:id', deleteReserva);

export default router