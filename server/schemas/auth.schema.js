import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Usuario requerido'
    }),
    email: z.string({
        required_error: 'Email requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Password requerida'
    }).min(6, {
        message: 'Password debe de tener al menos 6 caracteres'
    })
})

export const loginSchema = z.object({
    username: z.string({
        required_error: 'Usuario requerido'
    }),
    password: z.string({
        required_error: 'Password requerida'
    }).min(6, {
        message: 'Password debe de tener al menos 6 caracteres'
    })
})