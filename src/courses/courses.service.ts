import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Tag } from './entities/tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoursesDTO } from './dto/create-courses.dto';
import { UpdateCoursesDTO } from './dto/update-courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return this.courseRepository.find({relations: ['tags']});
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      // throw new HttpException(`Id ${id} nao existe ou nao foi encontrado`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Id ${id} nao existe ou nao foi encontrado`);
    }
    return course;
  }

  async create(createCourseDto: CreateCoursesDTO) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );

    const newCourse = this.courseRepository.create({
      ...createCourseDto,
      tags,
    });

    return this.courseRepository.save(newCourse);
  }

  async update(id: string, updateCourseDto: UpdateCoursesDTO) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourseDto,
      id,
      tags,
    }); // -> Faz a busca e cria o objeto

    if (!course) {
      throw new NotFoundException(`Id ${id} nao existe ou nao foi encontrado`);
    }

    return this.courseRepository.save(course);
  }

  async delete(id: string) {
    const course = await this.findOne(id);

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
