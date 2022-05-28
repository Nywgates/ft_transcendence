import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth.module';
import { AppGateway } from './app.gateway';

@Module({
	
	imports: [
		ConfigModule.forRoot({isGlobal: true}),
		TypeOrmModule.forRoot({
			type:'postgres',
			url: process.env.DATABASE_URL,
			autoLoadEntities: true,
			synchronize: true,
		}),
		UserModule,
		AuthModule
	],
	controllers: [],
	providers: [AppGateway],
})

export class AppModule {}
