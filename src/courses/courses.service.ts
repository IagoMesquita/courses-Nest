import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Framework Node para backend',
      tags: ["backend", "node", "nestjs", "TS"]
    }
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course =  this.courses.find(c => c.id === id);

    if(!course) {
      // throw new HttpException(`Id ${id} nao existe ou nao foi encontrado`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Id ${id} nao existe ou nao foi encontrado`);
    }
    return course;
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
    return createCourseDto;
  }

  update(id: number, updateCourseDto: any): void {
    const existCourse = this.findOne(id);

    if(existCourse) {
      const index = this.courses.findIndex(c => c.id === id);

      this.courses[index] = {
        id, 
        ...updateCourseDto
      };
    }
  }

  delete(id: number): void {
    const index = this.courses.findIndex(c => c.id === id);

    this.courses.splice(index, 1);
  }
}
