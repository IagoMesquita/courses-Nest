import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  constructor() {}

  @Get()
  findAll(@Res() response) {
    return response.status(200).json({ message: "Lisgatem de cursos" });
  }

  @Get(':courseId/users/:userId')
  findOneByUser(@Param() params) {
    return `Cursos com de ID ${params.courseId} do usuario de ID ${params.userId}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Curso com ID ${id}`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    console.log(body);
    return `Curso com ID ${id}`;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id') 
  remove(@Param('id') id: string) {
    return `Curso deletado ID ${id}`;
  }

}
