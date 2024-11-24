import { Controller,  Get } from '@nestjs/common';

@Controller()
export class AppController {
  

  @Get()
  wlcome() {
    return 'Bem vindos, aplicacao no ar!';
  }

}
