import UserRepository from "@modules/typeorm/repositories/UserRepository";
import UserTokensRepository from "@modules/typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
    email: string;
}

interface IRequestReset {
    token: string;
    password: string;
}

class UserTokenService {
    public async SendForgotPasswordEmail({ email }: IRequest): Promise<void>{
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const user = await userRepository.GetByEmail(email);

        if(!user || user === undefined) throw new AppError('User not found!');

        const token = await userTokenRepository.generate(user.id);

        const forgotPassordTemplate = path.resolve(__dirname, '../', 'views', 'forgot_password.hbs')

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[API Vendas] Recuperação de senha',
            templateData: {
                file: forgotPassordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token?.token}`,
                }
            },
        })
    }

    public async ResetPassword({ token, password }: IRequestReset): Promise<void>{
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokenRepository.GetByToken(token);

        if(!userToken) throw new AppError('User Token not found!');

        const user = await userRepository.GetById(userToken.user_id);

        if(!user) throw new AppError('User not found!');

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)) throw new AppError('Token expired.');

        user.password = await hash(password, 8);

        await userRepository.save(user);
    }
}

export default UserTokenService;
