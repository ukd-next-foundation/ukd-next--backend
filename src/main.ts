import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigTypes, globalConfig, swaggerConfig } from '@src/configurations';
import { AppModule } from '@src/app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const config: ConfigTypes = app.get(globalConfig.KEY);

  app.setGlobalPrefix(config.apiPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  SwaggerModule.setup(config.apiPrefix + config.swaggerUiPath, app, swaggerConfig(app));

  app.listen(config.serverPort, () => {
    logger.log(`🚀 Application is running local on: http://localhost:${config.serverPort}${config.apiPrefix}`);
    if (!config.isDevelopmentEnvironment) {
      logger.log(`🚀 Application is running global on: https://${config.domain}${config.apiPrefix}`);
    }
  });
}

bootstrap();
