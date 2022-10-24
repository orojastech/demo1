import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
let app = null
async function bootstrap() {
  app = await NestFactory.create(AppModule);
  return await app.listen(3000);
}
bootstrap()
