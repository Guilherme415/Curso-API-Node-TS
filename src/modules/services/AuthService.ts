import User from "@modules/typeorm/entities/User";
import UserRepository from "@modules/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth'
import { getCustomRepository } from "typeorm";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
}

class AuthService {
    public async Post({email, password}: IRequest): Promise<IResponse>{
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.GetByEmail(email);

        if(!user) throw new AppError('Email or password invalid!', 401);

        const passowrdConfirmed = await compare(password, user.password);

        if(!passowrdConfirmed) throw new AppError('Email or password invalid!', 401);

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token
        };
    }
}

export default AuthService;
