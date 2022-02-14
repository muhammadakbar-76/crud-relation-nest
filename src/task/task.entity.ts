import { Employee } from "../employee/employee.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Employee, employee => employee.task, {onDelete: "SET NULL"})
    employee: Employee;
}