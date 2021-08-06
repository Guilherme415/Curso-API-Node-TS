import User from "@modules/typeorm/entities/User";
import { getCustomRepository } from "typeorm";
import UserRepository from "@modules/typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import path from "path";
import uploadConfig from '@config/upload'
import fs from 'fs';

interface IRequest {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

interface IRequestAvatar {
    user_id: string;
    avatarFilename: any;
}


class UserService {

    public async Post({name, email, password, avatar}: IRequest): Promise<User>{
        const repository = getCustomRepository(UserRepository);
        const emailExists = await repository.GetByEmail(email);

        if(emailExists) throw new AppError('This email already use!');

        const hashedPassowrd = await hash(password, 8);

        const user = repository.create({
            name,
            email,
            password: hashedPassowrd,
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

    public async UpdateUserAvatar({ user_id, avatarFilename}: IRequestAvatar): Promise<User>{
        const repository = getCustomRepository(UserRepository);

        const user = await repository.GetById(user_id);

        if(!user) throw new AppError('User not found');

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await repository.save(user);

        return user;
    }
}

export default UserService;
