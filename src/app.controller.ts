import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  

  @Get()
  wlcome() {
    return 'Bem vindos, aplicacao no ar!';
  }

}
