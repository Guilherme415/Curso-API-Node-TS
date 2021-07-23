import User from "@modules/typeorm/entities/User";
import { getCustomRepository } from "typeorm";
import UserRepository from "@modules/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    email: string;
    password: string;
    avatar: string;
}



class UserService {

    public async Post({name, email, password, avatar}: IRequest): Promise<User>{
        const repository = getCustomRepository(UserRepository);
        const emailExists = await repository.GetByEmail(email);

        if(emailExists) throw new AppError('This email already use!');

        const user = repository.create({
            name,
            email,
            password,
            avatar
        });

        await repository.save(user);

        return user;
    }

    public async GetAll(): Promise<User[]>{
        const repository = getCustomRepository(UserRepository);
        const users = await repository.find();

        return users;
    }
}

export default UserService;
