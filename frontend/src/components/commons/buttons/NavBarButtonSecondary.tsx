import React from 'react'

// Types
import { IconType } from 'react-icons';

// Components
import {FiSmile} from 'react-icons/fi'

type NavBarButtonSecondaryProps = {
	cta : string,
	icon: IconType,
	onClick : () => void
}

const NavBarButtonSecondary = ({cta, onClick, icon } : NavBarButtonSecondaryProps) => {
	const Icon = icon;
	return (
		<button	
				className="	bg-transparent h-[48px] sm:h-[64px] w-[160px] sm:w-[200px] rounded
							font-space text-[20px] text-slate-400 hover:text-slate-200
							transition-all duration-300 ease-in-out
							flex justify-center items-center" 
				onClick={onClick} >
				<Icon className="w-[24px] h-[24px] mr-[8px]"></Icon>
				<p>{ cta }</p>
		</button>
	)
}

NavBarButtonSecondary.defaultProps = {
	cta: "Default",
	onClick: () => {
		console.log("GO MESSAGE PAGE")
	},
	icon: {FiSmile}
}

export default NavBarButtonSecondary
