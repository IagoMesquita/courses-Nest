import { Injectable } from '@nestjs/common';
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
    return this.courses.find(c => c.id === id);
  }

  create(createCourseDto: any) {
    return this.courses.push(createCourseDto);
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
