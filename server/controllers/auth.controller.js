import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

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
        res.status(500).json({ message: error.message })
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

        res.cookie('token', token)  //establece la cookie token, metodo ya hecho

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
