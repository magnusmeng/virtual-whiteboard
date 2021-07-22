import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from './teams/teams.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'magnusmengmortensen',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'whiteboards',
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true, // We do not create migrations atm, so we simply synchronize (with the known risk of destroying data)
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
