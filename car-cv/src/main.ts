import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
const  cookieSession  = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  Moved to the app.module file to be available in the testing environment

  app.use(
      cookieSession({
          keys: ['someKey'],
      })
  )

   */
    /*
  app.useGlobalPipes(
      new ValidationPipe({
          //make sure that incoming requests dont have properties we are not expecting. Extra properties will be stripped off.
          whitelist: true
      })
  )
     */
  await app.listen(3000);
}
bootstrap();
