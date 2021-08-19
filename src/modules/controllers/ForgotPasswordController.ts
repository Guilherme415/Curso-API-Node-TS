import UserTokenService from '@modules/services/UserTokenService';
import { Request, Response } from 'express';

export default class ForgotPasswordController {
    public async Post(request: Request, response: Response): Promise<Response> {
        const service = new UserTokenService();
        const email  = request.body;

        const sendForgotPasswordEmail = await service.SendForgotPasswordEmail(email);
        console.log('To aqui')
        return response.status(204).json(sendForgotPasswordEmail);
    }
}
