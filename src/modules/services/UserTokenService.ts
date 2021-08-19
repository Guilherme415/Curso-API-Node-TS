import UserRepository from "@modules/typeorm/repositories/UserRepository";
import UserTokensRepository from "@modules/typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";


interface IRequest {
    email: string;
}


class UserTokenService {
    public async SendForgotPasswordEmail({ email }: IRequest): Promise<void>{
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const user = await userRepository.GetByEmail(email);

        console.log("Service: ", user)
        if(!user || user === undefined) throw new AppError('User not found!');

        const token = await userTokenRepository.generate(user.id);

        console.log("token: ",token);
    }
}

export default UserTokenService;
