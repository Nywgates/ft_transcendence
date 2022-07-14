// Hooks
import React from 'react'
import { useNavigate } from 'react-router-dom'
// Assets
import defaultUserImage from '../../assets/images/default-user.png'

type FriendRequestOutProps = {
	username: string,
}

const FriendRequestOut = ({username} : FriendRequestOutProps) => {
	let navigate = useNavigate();
	// Get user image: 
	let userImage: string = defaultUserImage;

	return (
		<>
			{/* On click go to profile */}
			<div className='flex justify-between w-full h-[56px] rounded-[4px] bg-transparent mb-[16px] border-transparent border'>
				<div className='flex items-center w-full h-full text-slate-400/50 hover:text-slate-200 hover:cursor-pointer transition-all duration-300 ease-in-out'
						onClick={() => {navigate('/app/user/' + username)}}>
					{/* Fetch image */}
					
					<div className="border-2 border-transparent rounded-full ml-[8px]">
						<img src={userImage} width="40" height="40" alt="userimage" className='rounded-full opacity-50' ></img>
					</div>
					<div className="ml-[16px]">
						<p className='absolute mt-[-8px] text-slate-400/50 font-space text-[10px]'>Request Sent</p>
						<p className='font-space text-[20px]'>
							{username}
						</p>
					</div>
				</div>
			</div>

		</>
	)
}

FriendRequestOut.defaultProps = {
	username: 'username',
}

export default FriendRequestOut