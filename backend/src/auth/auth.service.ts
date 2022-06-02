import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, status } from '../user/models/user.entity';
import { Repository, getConnection } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
	@InjectRepository(UserEntity)
	private readonly repository: Repository<UserEntity>;

	@Inject(AuthHelper)
	private readonly helper: AuthHelper;

	/*
		create user in db, if username exist return HTTP C409 (CONFLICT)
	*/
	public async register(body: RegisterDto): Promise<UserEntity | never> {
		const { username }: RegisterDto = body;
		let user: UserEntity = await this.repository.findOne({ where: { username } });

		if (user) {
			throw new HttpException('Conflict', HttpStatus.CONFLICT);
		}

		user = new UserEntity();

		user.username = username;
		return this.repository.save(user);
	}

	/*
		login user if user exist in db, else create it, update status of user, return JWT token
	*/
	public async login(body: LoginDto): Promise<Object | never> {
		const { username}: LoginDto = body;
		var user: UserEntity = await this.repository.findOne({ where: { username } });

		if (!user) {
			await this.register(body);
			user = await this.repository.findOne({ where: { username } });
		}
		if (user.status === status.Connected){
			throw new HttpException('Conflict', HttpStatus.CONFLICT);
		}
		return {user:user, token:this.helper.generateToken(user)};
	}

	public async refresh(user: UserEntity): Promise<string> {
		return this.helper.generateToken(user);
	}
}