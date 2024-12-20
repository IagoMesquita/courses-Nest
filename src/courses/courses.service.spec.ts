import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { Repository } from 'typeorm';
import { Course } from './entities/courses.entity';
import { Tag } from './entities/tags.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateCoursesDTO } from './dto/create-courses.dto';
import { UpdateCoursesDTO } from './dto/update-courses.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let courseRepository: Repository<Course>;
  let tagsRepository: Repository<Tag>;

  let id: string;
  let created_at: Date;
  let expectOutputCourses: any;
  let expectOutputTags: any;
  let mockRepostitoryCourses: any;
  let mockRepostitoryTags: any;

  beforeEach(async () => {
    id = randomUUID();
    created_at = new Date();

    expectOutputTags = [
      {
        id,
        name: 'TagsTest',
        created_at,
      },
    ];

    expectOutputCourses = {
      id,
      name: 'cursoTeste',
      description: 'teste de testes',
      created_at,
      tags: expectOutputTags,
    };

    mockRepostitoryCourses = {
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    };

    mockRepostitoryTags = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockRepostitoryCourses,
        },
        {
          provide: 'TagRepository',
          useValue: mockRepostitoryTags,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);

    courseRepository = module.get<Repository<Course>>(
      getRepositoryToken(Course),
    );
    tagsRepository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    const createCourseDTO: CreateCoursesDTO = {
      name: 'cursoTeste',
      description: 'teste de testes',
      tags: ['Test'],
    };

    const newCourse = await service.create(createCourseDTO);

    console.log("newCoursae", newCourse);
    console.log("ExpectCoursae", expectOutputCourses);

    expect(mockRepostitoryCourses.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse);

  });

  it('should list all courses', async () => {
    const coursesDb = await service.findAll();

    expect(mockRepostitoryCourses.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(coursesDb);
  });

  it('should gets a course by id', async () => {
    const courseDb = await service.findOne(id);

    expect(mockRepostitoryCourses.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courseDb);
  });

  it('should update a course by id', async () => {

    const updateCourseDTO: UpdateCoursesDTO = {
      name: 'cursoTesteAtualizado',
      description: 'Atualizando descricao',
      tags: ['TagAtualizada'],
    };

    const course = await service.update(id, updateCourseDTO);

    expect(mockRepostitoryCourses.preload).toHaveBeenCalled();
    expect(mockRepostitoryCourses.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);

  });

  it('should delete a course', async () => {
    const deleteCourse = await service.delete(id);

    expect(mockRepostitoryCourses.findOne).toHaveBeenCalled();
    expect(mockRepostitoryCourses.remove).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(deleteCourse);

  });
  
});
