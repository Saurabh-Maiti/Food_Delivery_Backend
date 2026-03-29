import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({unique:true})
    email: string;
    @Column()
    password: string;
    @Column({unique:true})
    phoneNo: string;
    @CreateDateColumn()
    createdAt: Date;
}