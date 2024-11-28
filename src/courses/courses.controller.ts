import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCoursesDTO } from './dto/create-courses.dto';
import { UpdateCoursesDTO } from './dto/update-courses.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  async findAll(@Res() response) {
    const dataCourses = await this.courseService.findAll();
    return response.status(200).json(dataCourses);
  }

  @Get(':courseId/users/:userId')
  findOneByUser(@Param() params) {
    return `Cursos com de ID ${params.courseId} do usuario de ID ${params.userId}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courseService.findOne(id)
  }

  @Post()
  create(@Body() createCourseDto: CreateCoursesDTO) {
    
    return this.courseService.create(createCourseDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCourseDTO :UpdateCoursesDTO) {
    return this.courseService.update(id, updateCourseDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id') 
  remove(@Param('id') id: number) {
    return this.courseService.delete(id);
  }

}
