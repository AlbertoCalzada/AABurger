import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
}
export const createTask = async (req, res) => {

    const { title, description, date } = req.body

    const newTask = new Task({
        title,
        description,
        date
    })

    const savedTask = await newTask.save()
    res.json(savedTask)
}
export const getTask = async (req, res) => {

    const task = await Task.findById(req.params.id) //el dato de la url que me esten pasando
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
    }
    res.json(task)
}
export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id) //el dato de la url que me esten pasando
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
    }
    res.json(task)
}
export const updateTask = async (req, res) => {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }) //el dato de la url que me esten pasando y los nuevos datos
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
    }
    res.json(task)
}