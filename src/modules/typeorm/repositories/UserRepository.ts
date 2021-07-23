import { Repository, EntityRepository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User>{
    public async GetByName(name: string): Promise<User | undefined>{
        const user = await this.findOne({
            where: {
                name,
            },
        });

        return user;
    }

    public async GetById(id: string): Promise<User | undefined>{
        const user = await this.findOne({
            where: {
                id,
            },
        });

        return user;
    }

    public async GetByEmail(email: string): Promise<User | undefined>{
        const user = await this.findOne({
            where: {
                email,
            },
        });

        return user;
    }
}

export default UserRepository;

