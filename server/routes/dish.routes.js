import { Router } from 'express'
import express from 'express';
import { createDish, getDishes, getDishById, updateDish, deleteDish } from '../controllers/dish.controller.js';

const router = express.Router();

// Rutas 
router.post('/dish', createDish); // Crear 
router.get('/dish', getDishes); // Obtener todos 
router.get('/dish/:id', getDishById); // Obtener un plato por su ID
router.put('/dish/:id', updateDish); // Actualizar 
router.delete('/dish/:id', deleteDish); // Eliminar 

export default router;
