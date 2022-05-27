import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {APP_PIPE} from "@nestjs/core";
import {UsersModule} from './users/users.module';
import {ReportsModule} from './reports/reports.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/user.entity";
import {Report} from "./reports/report.entity";
import {AppService} from "../dist/app.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

const cookieSession = require('cookie-session');

/*
  How the config works
  The ConfigModule shares the env configurations with the rest of the application
  These configurations are then gotten from the ConfigModule via dependency injection

  Interceptors always run after middleware and guards
  So we cannot rely on any information set by an interceptor in the guard
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        UsersModule,
        ReportsModule,
        /*
        Use config service to get
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Report],
            synchronize: true
        })
         */

        TypeOrmModule.forRootAsync(({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: 'sqlite',
                    database: config.get<string>('DB_NAME'),
                    entities: [User, Report],
                    synchronize: true
                }
            }
        }))
    ],
    controllers: [],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true
            })
        }
    ],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    keys: ['someKey'],
                }),
            )
            .forRoutes('*');
    }
}
