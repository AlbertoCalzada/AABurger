import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import { get } from 'mongoose'

export const register = async (req, res) => {

    const { email, username, password } = req.body

    const passwordHash = await bcrypt.hash(password, 10)
    
    try {
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
        
        const userSaved = await newUser.save()
        
        const token = await createAccessToken({ id: userSaved._id })

        res.cookie('token', token)  //establece la cookie token, metodo ya hecho

        //le mandamos al front estos datos
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })

    } catch (error) {
        if (error.code === 11000) {
            // Si el error es debido a un correo electrónico duplicado
            if (error.keyPattern && error.keyPattern.email) {
                res.status(400).json({ message: 'Ya existe un usuario registrado con este correo electrónico.' });
            } 
            // Si el error es debido a un nombre de usuario duplicado
            else if (error.keyPattern && error.keyPattern.username) {
                res.status(400).json({ message: 'Ya existe un usuario registrado con este nombre de usuario.' });
            } else {
                console.log("Error interno del servidor al registrar usuario:", error);
            }
        } else {
            // Para otros errores, devolvemos un mensaje genérico
            console.log("Error al registrar:", error);
            console.log("Error interno del servidor al registrar usuario:", error);
        }
    }


}
export const login = async (req, res) => {

    const { username, password } = req.body

    try {

        const userFound = await User.findOne({ username })

        if (!userFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' })
        }

        const isEqual = await bcrypt.compare(password, userFound.password) //Para comparar contraseñas hasheadas

        if (!isEqual) {
            return res.status(400).json({ message: 'Contraseña incorrecta' })
        }


        const token = await createAccessToken({ id: userFound._id })

        res.cookie('token', token)  //establece la cookie llamada token, metodo ya hecho

        //le mandamos al front estos datos
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}

export const logout = (req, res) => {

    res.cookie('token', "", { expires: new Date(0) }) //Borramos token

    return res.status(200).json({ message: 'Logout exitoso' })
}

export const profile = async (req, res) => {

    const userFound = await User.findById(req.user.id) //Buscamos al usuario en concreto por su id
       
    if (!userFound) {
        return res.status(400).json({ message: "Usuario no encontrado" })
    }

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })


}
