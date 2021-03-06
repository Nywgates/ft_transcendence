import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GAMES_SOCKET, status } from '../common/types';
import { Repository, getConnection } from 'typeorm';
import { ConversationI, UserI, UserSafeInfo, UserSocket, MessageI, safeConv, safeRoom } from './models/user.interface';
import { User, Message, Conversation, GameData } from './models/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Conversation)
		private convRepository: Repository<Conversation>,
		@InjectRepository(GameData)
		private gameRepository: Repository<GameData>,
		@InjectRepository(Message)
		private messageRepository: Repository<Message>,

	){}

	public connectedUser: UserSocket[] = [];

	/*
		return list of user store in db
	*/
	findAll():Promise<UserI[]> {
		return this.userRepository.find();
	}

	/*
	return list of user store in db
	*/
	async getConnected():Promise<JSON> {
		let res:any = await Promise.all(this.connectedUser.map(async data => {
			let res = await this.parseUserInfo(data.id)
			return res
		}))
		return res
	}

	/*
		find user by username
	*/
	findOne(username: string):Promise<UserI | undefined> {
		return this.userRepository.findOne({ username });
	}
	/*
		find user by username
	*/
	findUserByIntra(intraID: number):Promise<UserI | undefined> {
		return this.userRepository.findOne({ where:{intraID:intraID} });
	}

	/*
	*/
	connectUser(data: {id:number,username:string,socket: any,status:status, gameID:string}) {
		let user = this.connectedUser.find((user: any) => {return user.id === data.id})
		if (!user){
			this.connectedUser.push({
				id:data.id,
				username:data.username,
				socket: data.socket,
				status:status.Connected,
				gameID:data.gameID,
				challenged:false
			})
		}
		console.log(data.username, "connected");
	}

	/*
	*/
	disconnectUser(socketID:number) {
		const user = this.connectedUser.find((user: any) => {return user.socket.id === socketID})
		if (user) {
			this.connectedUser.splice(this.connectedUser.findIndex(v => v.id === user.id), 1);
			console.log(user.username, "disconnected");
		}
	}

	/*
	*/
	findConnectedUserById(id:number) {
		const user = this.connectedUser.find((user: any) => {return user.id === id})
		if (user)
			return user;
		return null
	}

	/*
	*/
	findConnectedUserBySocketId(socketID:number):UserSocket {
		const user = this.connectedUser.find((user: any) => {return user.socket.id === socketID})
		if (user)
			return user;
		return null
	}
	/*
	*/
	findConnectedUserByUsername(username:string):UserSocket {
		const user = this.connectedUser.find((user: any) => {return user.username === username})
		if (user)
			return user;
		return null
	}

	/*
	*/
	getUserStatus(id:number):status {
		const user = this.connectedUser.find((user: any) => {return user.id === id})
		if (user)
			return user.status;
		return status.Disconnected
	}

	/*
	*/
	async updateUserDB(users:User[]) {
		for (let user of users){
			await getConnection()
				.createQueryBuilder()
				.update(User)
				.set(user)
				.where("id = :id", { id: user.id })
				.execute();
		}
	}

	async saveGame(_game:GAMES_SOCKET){
		const usersRepo:User[] = await this.userRepository.find()
		let game = new GameData();
		game.users = _game.usersID.map(id => usersRepo.find(el => el.id == id))
		game.winner = _game.pong.getWinner().id
		game.duration = _game.pong.getDuration()
		game.maxSpeed = _game.pong.getMaxBallSpeed()
		game.score = _game.pong.getScore()
		await this.gameRepository.save(game)
	}

	async getGameStatByUserId(userId:number):Promise<any>{
		const userRepo: User = await this.userRepository.findOne({ where:{id:userId}, relations: ['gameData', 'gameData.users']})
		return {
			gameStats:userRepo.gameData,
			username:userRepo.username,
			id:userRepo.id,
			status:this.getUserStatus(userRepo.id)
		};
	}

	async getConversationByUserId(user:User):Promise<safeConv[]>{
		var _conv:safeConv[] = [];

		if (user){
			for (let conv of user.conversations) {
				_conv.push({
					id:conv.id,
					name:conv.name,
					msg:conv.messages,
					users:conv.users.map(user => ({id:user.id, username:user.username}))
				})
			}
		}
		return _conv;
	}

	async getRoomByUserId(id:number):Promise<safeRoom[]>{
		var _room:safeRoom[] = [];
		const user = await this.userRepository.findOne({
			relations: ['rooms', 'rooms.users', 'rooms.messages'],
			where: {
				id: id
			}
		})
		if (user){
			for (let room of user.rooms) {
				_room.push({
					id: room.id,
					name: room.name,
					password: room.password,
					adminId: room.adminId,
					users: room.users.map(user => ({id:user.id, username:user.username})),
					msg: room.messages,
				})
			}
		}
		return _room;
	}
	/*
		return more readable user data for client
	*/
	async parseUserInfo(userID:number):Promise<UserSafeInfo> {
		const usersRepo:User[] = await this.userRepository.find()
		const userRepo: User = await this.userRepository.findOne({ where:{id:userID}, relations: ['conversations', 'conversations.messages', 'conversations.users']})
		const userInfo:UserSocket = this.connectedUser.find((user: any) => {return user.id === userID})

		var UserSafeInfo:UserSafeInfo = {
			id: userRepo.id,
			username: userRepo.username,
			status: userInfo ? userInfo.status : status.Disconnected,
			profilPic: userRepo.profilPic,
			gameID: userInfo ? userInfo.gameID : undefined,
		};
		UserSafeInfo.friends = userRepo.friends.map(id => ({ id: id, username: usersRepo.find(el => el.id == id).username}));
		UserSafeInfo.bloqued = userRepo.bloqued.map(id => ({ id: id, username: usersRepo.find(el => el.id == id).username}));
		UserSafeInfo.friendsRequest = userRepo.friendsRequest.map(id => ({ id: id, username: usersRepo.find(el => el.id == id).username}));
		UserSafeInfo.pendingRequest = userRepo.pendingRequest.map(id => ({ id: id, username: usersRepo.find(el => el.id == id).username}));
		UserSafeInfo.conv = await this.getConversationByUserId(userRepo);
		UserSafeInfo.room = await this.getRoomByUserId(userRepo.id);
		return UserSafeInfo;
	}
}
