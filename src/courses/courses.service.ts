import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoursesDTO } from './dto/create-courses.dto';
import { UpdateCoursesDTO } from './dto/update-courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      // throw new HttpException(`Id ${id} nao existe ou nao foi encontrado`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Id ${id} nao existe ou nao foi encontrado`);
    }
    return course;
  }

  async create(createCourseDto: CreateCoursesDTO) {
    const newCourse = this.courseRepository.create(createCourseDto);

    return this.courseRepository.save(newCourse);
  }

  async update(id: number, updateCourseDto: UpdateCoursesDTO) {
    const course = await this.courseRepository.preload({
      ...updateCourseDto,
      id,
    }); // -> Faz a busca e cria o objeto

    if (!course) {
      throw new NotFoundException(`Id ${id} nao existe ou nao foi encontrado`);
    }

    return this.courseRepository.save(course);
  }

  async delete(id: number) {
    const course = await this.findOne(id)

    return this.courseRepository.remove(course);
  }
}
