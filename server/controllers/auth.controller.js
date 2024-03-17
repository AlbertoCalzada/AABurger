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
export const login = (req, res) => res.send('login')

