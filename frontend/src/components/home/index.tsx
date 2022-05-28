import React from 'react'
import Header from '../header'
import './home.css';
import ContactList from '../contactList';
import Chat from '../chat'

export default function Home() {
	
	return (
		<>
			<div className='header'>
				<Header/>
			</div>
			<div className='chat'>
				<Chat/>
			</div>
			<div className='contactList'>
				<ContactList/>
			</div>
		</>
	)
}