import express, { Request, Response } from 'express'
import { body } from 'express-validator';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken'

import { validateRequest, BadRequestError, Env } from '@tomersftickets/common';
import { User } from '../models/user';
import { PasswordManager } from '../utils/password';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().notEmpty().withMessage('You must supply a password')
    ], validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }

        const passwordsMatch = await PasswordManager.compare(existingUser.password, password)
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials')
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, Env.get('JWT_KEY'))

        req.session = {
            jwt: userJwt
        }

        res.status(httpStatus.OK).send(existingUser)
    })


export { router as signinRouter }