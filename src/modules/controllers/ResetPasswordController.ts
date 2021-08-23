import UserTokenService from '@modules/services/UserTokenService';
import { Request, Response } from 'express';

export default class ResetPasswordController {
    public async Post(request: Request, response: Response): Promise<Response> {
        const service = new UserTokenService();
        const {password, token}  = request.body;

        await service.ResetPassword({
            password,
            token
        });
        return response.status(204).json();
    }
}
