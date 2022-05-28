import React, { useState } from "react";
import { IState as Props } from "./index";
import { io, Socket } from 'socket.io-client'
import { useSelector } from 'react-redux'

interface IProps {
	msg: Props["msg"]
	setMessage: React.Dispatch<React.SetStateAction<Props["msg"]>>
}

const socket: Socket = io('http://localhost:5000')

const AddToList: React.FC<IProps> = ({ msg, setMessage }) => {

	const [input, setInput] = useState({
		content: ""
	})

	const global = useSelector((state: any) => state.global)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
	}

	const sendMessage = (): void => {
		console.log('send:');
		socket.emit('msgToServer', [global.username, input.content]);
		setInput({
			content: ""
		})
	}

	const receiveMessage = (): void => {
		let hour: Date = new Date
		socket.on('msgToClient', (sender: string, message: string) => {
			console.log("recv: ", message);
			setMessage([
				...msg,
				{
					author: sender,
					content: message,
					date: hour.toLocaleTimeString('fr-EU'),
				}
			]);
		})
	}

	receiveMessage();

	return (
		<div className="AddToList">
			<input
				className="add-chat"
				type="text"
				placeholder="write here..."
				value={input.content}
				onChange={handleChange}
				name="content"
			/>
			<button
				className="add-chat"
				onClick={sendMessage}
			>
				Send
			</button>
		</div>
	)
}

export default AddToList;
