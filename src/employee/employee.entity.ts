import { Contact } from "../contact/contact.entity";
import { Meeting } from "../meeting/meeting.entity";
import { Task } from "../task/task.entity";
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Employee, employee => employee.directReports, {onDelete: "SET NULL"})
    manager: Employee;

    @OneToMany(() => Employee, employee => employee.manager)
    directReports: Employee[];

    @OneToOne(type => Contact, contact => contact.employee,{
        cascade: true,
        eager: true
    })
    contact: Contact;

    @OneToMany(() => Task, task => task.employee,{
        eager: true
    }) 
    /* 
    you could add option object into 3rd parameter like cascade, eager, lazy.

    cascade = if you want to save some relation field in one go, you could set this to true (check app service seed method)

    eager = include all relation in query

    lazy = im too lazy to explain
    */
    task: Task[];

    @ManyToMany(() => Meeting, meeting => meeting.attendes)
    @JoinTable()
    meetings: Meeting[]
}