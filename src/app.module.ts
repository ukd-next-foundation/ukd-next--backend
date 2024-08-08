import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config, GlobalConfig, typeormConfig } from '@app/src/configs';
import { TypeOrmFilterProvider } from '@app/common/exception-filters';
import { ApiModule } from '@app/api/api.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [GlobalConfig],
      useFactory: typeormConfig,
    }),
    ScheduleModule.forRoot(),
    ApiModule,
  ],
  providers: [TypeOrmFilterProvider],
})
export class AppModule {}
