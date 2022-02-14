import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Employee } from '../employee/employee.entity';
import { CreateContactEmployeeDto, CreateEmployeeDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllEmployees(): Promise<Employee[]>  {
    return this.appService.getAllEmployees();
  }

  @Get("seed")
  seed() {
    return this.appService.seed();
  }

  @Get(':id')
  getEmployeeById(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return this.appService.getEmployeeById(id);
  }

  @Get(":id/del")
  delEmployee(@Param("id",ParseIntPipe) id: number) {
    return this.appService.deleteEmployee(id);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file",{
    dest: "./src/images"
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post("add")
  @UseInterceptors(FileInterceptor("file",{
    storage: diskStorage({
      destination: '../images', 
      filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  addNewEmployee(@Body() body: CreateEmployeeDto & CreateContactEmployeeDto, @UploadedFile() file: Express.Multer.File){
    return {
      body,
      file
    }
  }
}
