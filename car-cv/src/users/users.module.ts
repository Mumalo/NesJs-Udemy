import {MiddlewareConsumer, Module} from '@nestjs/common';
import {UsersController} from './controllers/users.controller';
import {UsersService} from './services/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {AuthService} from "./services/auth.service";
import {CurrentUserMiddleware} from "./middlewares/current-user.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthService,
        /* We used this interceptor as a middleware instead
        {
            provide: APP_INTERCEPTOR, // Global interceptor
            useClass: CurrentUserInterceptor
        }
         */
    ]
})

export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes('*')
    }
}
