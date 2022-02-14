import { Employee } from "../employee/employee.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    zoomUrl: string;

    @ManyToMany(() => Employee, employee => employee.meetings)
    attendes: Employee[];
}