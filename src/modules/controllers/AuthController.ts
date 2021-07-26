import AuthService from "@modules/services/AuthService";
import { Request, Response } from "express";

const service = new AuthService();

class AuthController{

    public async Post(request: Request, response: Response): Promise<Response>{
        const {email, password} = request.body;

        const user = await service.Post({email, password});

        return response.json(user);
    }
}

export default AuthController;
