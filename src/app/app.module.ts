import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { Contact } from '../contact/contact.entity';
import { Employee } from '../employee/employee.entity';
import { Meeting } from '../meeting/meeting.entity';
import { Task } from '../task/task.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await 
         getConnectionOptions(), {
          autoLoadEntities: true,
        })
    }),
    TypeOrmModule.forFeature([Contact, Employee, Meeting, Task])
], //u just need imports if u create module for every entities in db
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
