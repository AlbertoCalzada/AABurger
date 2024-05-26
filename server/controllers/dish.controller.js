import Dish from '../models/dish.model.js';

// Crear 
export const createDish = async (req, res) => {
    try {
        const dish = new Dish(req.body);
        await dish.save();
        res.status(201).json({ success: true, data: dish });
    } catch (error) {
        console.error('Error al crear el plato:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// get
export const getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.status(200).json({ success: true, data: dishes });
    } catch (error) {
        console.error('Error al obtener los platos:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// get one
export const getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ success: false, error: 'Plato no encontrado' });
        }
        res.status(200).json({ success: true, data: dish });
    } catch (error) {
        console.error('Error al obtener el plato:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// update
export const updateDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!dish) {
            return res.status(404).json({ success: false, error: 'Plato no encontrado' });
        }
        res.status(200).json({ success: true, data: dish });
    } catch (error) {
        console.error('Error al actualizar el plato:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// delete
export const deleteDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndDelete(req.params.id);
        if (!dish) {
            return res.status(404).json({ success: false, error: 'Plato no encontrado' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.error('Error al eliminar el plato:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};
