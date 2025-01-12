import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import slug from 'slug';
import User from "../models/User";
import { hashPassword, checkPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {

    const { email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        const error = new Error('El usuario ya existe')
        res.status(409).json({ error: error.message })
        return
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle })
    if (handleExists) {
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({ error: error.message })
        return
    }


    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()
    res.status(201).send('¡Usuario registrado correctamente!')
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    // Revisar si el usuario existe
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('El usuario no existe')
        res.status(404).json({ error: error.message })
        return
    }

    // Revisar si la contraseña es correcta
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('La contraseña es incorrecta')
        res.status(401).json({ error: error.message })
        return
    }

    res.send('Autenticado...')
}