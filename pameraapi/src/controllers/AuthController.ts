// src/controllers/AuthController.ts
import { inject } from 'inversify';
import { controller, httpPost, requestBody, response } from 'inversify-express-utils';
import { Response } from 'express';
import bcrypt from 'bcryptjs';

import {AuthService} from "../services/concrete/AuthService";
import {LoginDTOReq, RegisterDTOReq} from "../dto/IAuthDTO";

@controller('/api/auth')
export class AuthController {
    constructor(
        @inject('IAuthService') private authService: AuthService
    ) {}

    @httpPost('/register')
    public async register(@requestBody() registerDTO: RegisterDTOReq, @response() res: Response) {
        try {
            const user = await this.authService.register(registerDTO);
            res.status(201).json(user);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message || 'Registration failed' });
        }
    }

    @httpPost('/login')
    public async login(@requestBody() loginDTO: LoginDTOReq, @response() res: Response) {
        try {
            const { token, user } = await this.authService.login(loginDTO);
            res.json({ token, user });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message || 'Login failed' });
        }
    }
}
