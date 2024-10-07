import './Header.css';

import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

import AuthContext from '../Logic/AppContext';

class Header extends React.Component {

	render() {
		return (
			<Navbar>
				<Container>
					{/* <Navbar.Brand href="#home">Navbar with text</Navbar.Brand> */}
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							<AuthContext.Consumer>
								{({ profile, setProfile }) => (
									<>
										{
											profile
												? <div>
													<span><b>{profile.getName()}</b></span>
													<img className="profile-picture" src={profile.getProfileImage()} alt={profile.getName()} />
												</div>
												: <span><Link to={'login'}>Entrar</Link></span>
										}
									</>
								)}
							</AuthContext.Consumer>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default Header;