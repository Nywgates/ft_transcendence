import React from "react";
import { MessageI } from './index';


type MessageProps = {
	message: MessageI,
	own:boolean
}

const Message = ({ message, own }:MessageProps) => {
	let date = new Date(message.date)

	return (
		<div>
			{!own ?
				<div style={{color:'white', padding:'5px', display:"flex",
				flexDirection:"column",alignItems:"flex-start", wordWrap: 'break-word'}}>
					<p >
						{message.author} {date.getHours()}:{date.getMinutes()}
					</p>
					<p className="justify-right" style={{wordBreak: 'break-all'}}>
						{message.content}
					</p>
				</div>
				:
				<div style={{color:'white', padding:'5px', display:"flex",
				flexDirection:"column",alignItems:"flex-end"}}>
					<p >
						{date.getHours()}:{date.getMinutes()} {message.author}
					</p>
					<p className="justify-right" style={{wordBreak: 'break-all'}}>
						{message.content}
					</p>
				</div>
			}
		</div>
	)
}

export default Message;