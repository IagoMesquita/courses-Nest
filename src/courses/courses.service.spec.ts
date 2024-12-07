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
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses))
    };

    mockRepostitoryTags = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      create: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockRepostitoryCourses,
        },
        {
          provide: getRepositoryToken(Tag),
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
});
