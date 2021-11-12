import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger(bootstrap.name)

  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'production')
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  const port = config.get('server.port');
  await app.listen(port);

  logger.debug(`Application is running on port ${port}`)
}
bootstrap();
