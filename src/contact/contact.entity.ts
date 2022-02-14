import { Employee } from "../employee/employee.entity";
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    phone: string;

    @Column()
    email: string;

    @OneToOne(() => Employee, employee => employee.contact, {onDelete: "CASCADE"})
    @JoinColumn()
    employee: Employee;
}