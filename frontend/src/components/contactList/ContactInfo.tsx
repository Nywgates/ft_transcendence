// Hooks
import React from 'react'
import { useNavigate } from "react-router-dom";

// Types
import { status } from '../../common/types';


type ContactInfoProps = {
	contact: {
		username:string,
		id:number,
		status:status,
		
	},
	userImage:string
}

const ContactInfo = ({contact, userImage} : ContactInfoProps) => {
	let navigate = useNavigate();
	return (
		<>
			{/* On click go to profile */}
				<div className='flex items-center w-full h-full text-slate-400 hover:text-slate-200 hover:cursor-pointer transition-all duration-300 ease-in-out'
						onClick={() => {navigate('/app/user/' + contact.username)}}>
					{/* Fetch image */}
						{contact.status === status.Connected ?
							<>
								<div className="border-2 border-green-500 rounded-full ml-[8px]">
									<img src={userImage} width="40" height="40" alt="userimage" className='rounded-full'>
									</img>
								</div>		
								<div className="ml-[16px]">
									<p className='absolute mt-[-8px] text-green-500 font-space text-[10px]'>{contact.status}</p>
									<p className='font-space text-[20px]'>
										{contact.username}
									</p>
								</div>
							</>
						:
						contact.status === status.InGame || contact.status === status.Spectate || contact.status === status.InQueue ?
							<>
								<div className="border-2 border-yellow-500 rounded-full ml-[8px]">
									<img src={userImage} width="40" height="40" alt="userimage" className='rounded-full'>
									</img>
								</div>
								<div className="ml-[16px]">
									<p className='absolute mt-[-8px] text-yellow-500 font-space text-[10px]'>{contact.status}</p>
									<p className='font-space text-[20px]'>
										{contact.username}
									</p>
								</div>
							</>
						: // disconnected
						<>
							<div className="border-2 border-transparent rounded-full ml-[8px]">
									<img src={userImage} width="40" height="40" alt="userimage" className='rounded-full'>
									</img>
							</div>
							<div className="ml-[16px]">
								<p className='font-space text-[20px]'>
									{contact.username}
								</p>
							</div>
						</>
						}
				</div>
		</>
	)
}

export default ContactInfo