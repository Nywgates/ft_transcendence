import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AuthModule } from './auth/auth.module';
import { EventsService } from './events.service';

@Module({
	imports:[
		TypeOrmModule.forFeature([UserEntity]),
		AuthModule
	],
	providers: [UserService, EventsService],
	controllers: [UserController]
})
export class UserModule {}