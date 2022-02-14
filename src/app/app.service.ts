import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../contact/contact.entity';
import { Employee } from '../employee/employee.entity';
import { Meeting } from '../meeting/meeting.entity';
import { Task } from '../task/task.entity';
import { Repository } from 'typeorm';
import { CreateContactEmployeeDto, CreateEmployeeDto } from './app.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Contact) private readonly contactRepository: Repository<Contact>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Meeting) private readonly meetingRepository: Repository<Meeting>,
  ) {}

  async seed(): Promise<object> {
      const ceo = this.employeeRepository.create({
        name: "Mr. Ceo"
      })
      await this.employeeRepository.save(ceo);
  
      const ceoContact = this.contactRepository.create({
        email: "email@email.com"
      })
      ceoContact.employee = ceo;
      await this.contactRepository.save(ceoContact);
      
      const manager = this.employeeRepository.create({
        name: "Muhammad Akbar",
        manager: ceo
      });

      const task = this.taskRepository.create({
        name: "Hire People"
      });
      await this.taskRepository.save(task);

      const task2 = this.taskRepository.create({
        name: "Present to CEO"
      });
      await this.taskRepository.save(task2);

      manager.task = [task,task2];

      const meeting1 = this.meetingRepository.create({
        zoomUrl: "meeting.com"
      });

      meeting1.attendes = [ceo];

      await this.meetingRepository.save(meeting1);

      manager.meetings = [meeting1];

      await this.employeeRepository.save(manager);

      return {
        message: "Database successfully seeded",
        status: 200
      }
  }

  async getEmployeeById(id: number): Promise<Employee> {
    /* option one */
    // return await this.employeeRepository.findOneOrFail(id,{
    //   relations: ["manager", "directReports", "task", "contact", "meetings"]
    // });

    /* option two */
    //query builder typeorm
    return await this.employeeRepository
    .createQueryBuilder("employee")
    .leftJoinAndSelect("employee.manager", "manager")
    .leftJoinAndSelect("employee.directReports", "directReports")
    .leftJoinAndSelect("employee.task", "task")
    .leftJoinAndSelect("employee.contact", "contact")
    .leftJoinAndSelect("employee.meetings", "meetings")
    .where("employee.id = :employeeId", {employeeId: id})
    .getOne();
  }

  async deleteEmployee(id: number): Promise<any> {
    return await this.employeeRepository.delete(id);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async addEmployee(body: CreateEmployeeDto & CreateContactEmployeeDto) {
    const newEmployee = this.employeeRepository.create({name: body.name});
    
    const newEmployeeContact = this.contactRepository.create({phone: body.phone, email: body.email});

    newEmployee.contact = newEmployeeContact;

    return await this.employeeRepository.save(newEmployee);
  }

}
