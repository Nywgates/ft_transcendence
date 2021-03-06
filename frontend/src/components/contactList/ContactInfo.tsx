// Hooks
import React from 'react'

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
	return (
		<>
			{/* On click go to profile */}
				<div className='flex items-center w-full h-full'>
					{/* Fetch image */}
					<div className="border-2 border-green-500 rounded-full ml-[8px]">
						<img src={userImage} width="40" height="40" alt="userimage" className='rounded-full'>
						</img>
					</div>
					
						{contact.status === status.Connected ?
							<div className="ml-[16px]">
								<p className='absolute mt-[-8px] text-green-500 font-space text-[10px]'>{contact.status}</p>
								<p className='font-space text-slate-400 text-[20px]'>
									{contact.username}
								</p>
							</div>
						:
						contact.status === status.InGame || contact.status === status.Spectate || contact.status === status.InQueue ?
							<div className="ml-[16px]">
								<p className='absolute mt-[-8px] text-yellow-500 font-space text-[10px]'>{contact.status}</p>
								<p className='font-space text-slate-400 text-[20px]'>
									{contact.username}
								</p>
							</div>
						:
						<div className="ml-[16px]">
							<p className='font-space text-slate-400/50 text-[20px]'>
								{contact.username}
							</p>
						</div>
						}
				</div>
		</>
	)
}

export default ContactInfo