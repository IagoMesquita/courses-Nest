import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { Repository } from 'typeorm';
import { Course } from './entities/courses.entity';
import { Tag } from './entities/tags.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let courseRepository: Repository<Course>;
  let tagsRepository: Repository<Tag>;

  let id: string;
  let created_at: Date;
  let expectOutputCourses: any;
  let expectOutTags: any;
  let mockRepostitoryCourses: any;
  let mockRepostitoryTags: any;

  beforeEach(async () => {
    id = randomUUID();
    created_at = new Date();

    expectOutTags = [
      {
        id,
        name: 'TagsTest',
        created_at,
      }
    ];

    expectOutputCourses = {
      id,
      name: 'cursoTeste',
      description: 'teste de testes',
      created_at,
      tags: expectOutTags,
    };

    mockRepostitoryCourses = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
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
});
