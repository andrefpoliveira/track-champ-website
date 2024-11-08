import './Header.css';

import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

import AuthContext from '../../Logic/AppContext';
import { resolveImagePath } from '../../Logic/Utils/images';

export default function Header() {
	const { user } = React.useContext(AuthContext);

	return (
		<Navbar>
			<Container>
				{/* <Navbar.Brand href="#home">Navbar with text</Navbar.Brand> */}
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-between">
					<Navbar.Text>
						v0.8.2
					</Navbar.Text>
					<Navbar.Text>
						{
							user
							? <div className='profile-info'>
								<span><b>{user.getName()}</b></span>
								<img className="profile-picture" src={resolveImagePath(user.getProfileImage())} alt={user.getName()} />
							</div>
							: <span><Link to={'/entrar'}>Entrar</Link></span> 
						}
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}