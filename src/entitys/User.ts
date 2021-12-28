import { Column, Entity, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity("users")
class User{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;
}

export { User }