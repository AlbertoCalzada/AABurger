import Reserves from '../models/reserve.model.js'

export const createReserva = async (req, res) => {
    try {
      const reserva = new Reserves(req.body)
      await reserva.save()
      res.status(201).json({ success: true, data: reserva })
    } catch (error) {
      console.error('Error al crear reserva:', error)
      res.status(500).json({ success: false, error: 'Error interno del servidor' })
    }
  };