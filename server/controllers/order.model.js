import Order from '../models/order.model.js';

// Crear 
export const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// Obtener todos 
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// Obtener un pedido 
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error('Error al obtener el pedido:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// Actualizar 
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!order) {
            return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error('Error al actualizar el pedido:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// Eliminar 
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};
