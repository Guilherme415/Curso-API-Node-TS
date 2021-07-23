import UserService from "@modules/services/UserService";
import { Request, Response } from "express";

const service = new UserService();

class UserController {
    public async GetAll(request: Request, response: Response): Promise<Response>{
        const users = await service.GetAll();

        return response.json(users);
    }

    public async Post(request: Request, response: Response): Promise<Response>{
        const obj = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            avatar: ''
        };


        const createUser = await service.Post(obj);

        return response.json(createUser);
    }
}

export default UserController;
