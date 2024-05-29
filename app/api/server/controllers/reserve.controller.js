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


  //para ver reservas
  export const getReservas = async (req, res) => {
    try {
        const reservas = await Reserves.find();
        res.status(200).json({ success: true, data: reservas });
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// Obtener una reserva por ID
export const getReservaById = async (req, res) => {
  try {
      const reserva = await Reserves.findById(req.params.id);
      if (!reserva) {
          return res.status(404).json({ success: false, error: 'Reserva no encontrada' });
      }
      res.status(200).json({ success: true, data: reserva });
  } catch (error) {
      console.error('Error al obtener la reserva:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

//update reserva

export const updateReserva = async (req, res) => {
  try {
      const reserva = await Reserves.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
      });
      if (!reserva) {
          return res.status(404).json({ success: false, error: 'Reserva no encontrada' });
      }
      res.status(200).json({ success: true, data: reserva });
  } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Eliminar una reserva
export const deleteReserva = async (req, res) => {
  try {
      const reserva = await Reserves.findByIdAndDelete(req.params.id);
      if (!reserva) {
          return res.status(404).json({ success: false, error: 'Reserva no encontrada' });
      }
      res.status(200).json({ success: true, data: {} });
  } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};