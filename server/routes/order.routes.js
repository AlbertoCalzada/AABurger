import { Router } from 'express'
import express from 'express';

import { createOrder,getOrders,getOrderById,updateOrder,deleteOrder } from '../controllers/order.model.js';

const router = express.Router();

// Rutas 
router.post('/order', createOrder); // Crear 
router.get('/order', getOrders); // Obtener todos 
router.get('/order/:id', getOrderById); // Obtener uno
router.put('/order/:id', updateOrder); // Actualizar 
router.delete('/order/:id', deleteOrder); // Eliminar 

export default router;
