import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  findAll(@Res() response) {
    const dataCourses = this.courseService.findAll();
    return response.status(200).json(dataCourses);
  }

  @Get(':courseId/users/:userId')
  findOneByUser(@Param() params) {
    return `Cursos com de ID ${params.courseId} do usuario de ID ${params.userId}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courseService.findOne(+id)
  }

  @Post()
  create(@Body() body) {
    return this.courseService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.courseService.update(+id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id') 
  remove(@Param('id') id: number) {
    return this.courseService.delete(+id);
  }

}
