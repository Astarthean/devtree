import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from "./handlers/idex";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router();

/** Autenticación y registro */
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido'),
    body('name')
        .notEmpty()
        .withMessage('El nombre es requerido'),
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('El email no es válido'),
    body('password')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('La contraseña es requerida y debe tener al menos 6 caracteres'),
    handleInputErrors,
    createAccount
)

router.post('/auth/login',
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('El email no es válido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida'),
    handleInputErrors,
    login
)

router.get('/user', authenticate, getUser)
router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido'),
    body('description')
        .notEmpty()
        .withMessage('La descripción es requerida'),
    handleInputErrors,
    authenticate,
    updateProfile
)

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    handleInputErrors,
    searchByHandle
)

export default router;