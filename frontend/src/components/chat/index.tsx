import React, {useState} from 'react';
import List from './list'
import AddToList from './addToList'

export interface IState {
	msg: {
		author: string
		content: string
		date: string
	}[]
}

function Chat() {

	const [msg, setMessage] = useState<IState["msg"]>([])

	return (
		<div className="chat">
			<h3>WhatsApp</h3>
			<List msg={msg}/>
			<AddToList msg={msg} setMessage={setMessage}/>
		</div>
	)
}

export default Chat;
