import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  await app.listen(3000);
}
bootstrap();


// - Class-Validation nos Dtos + new ValidationPipe: validam as propriedades
// - whitelist: true; Desconsidera qlq propriedade que esta sendo enviado no payload mas que nao esta no dto,
// so enviando oq de fato e esperado pela aplicacao. (Informacoes indevidas)
// - forbidNonWhitelisted: true; funciona junto com a whitlist, ao inves de enviar apenas o que e 
// solicitado, nesse caso bloqueia a request e informa quais a propriedades indevidas.
// transform: true; baseado nas class-validation dos DTO`s, ele tranfor os tipos das propriedades
// de acordo com os . EX: O id pelo params vem como string, mas como o tipo da entidade e number
// ele fica como number.