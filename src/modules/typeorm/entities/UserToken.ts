import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from "uuid"

@Entity('user_tokens')
class UserToken{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuid();
        }
        if(!this.token) {
            this.token = uuid();
        }
    }
}

export default UserToken;
