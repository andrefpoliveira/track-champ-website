import './EditProfile.css';
import React from "react";

import Button from 'react-bootstrap/Button';

import { FaEdit } from "react-icons/fa";

import AuthContext from '../../Logic/AppContext';

export default function EditProfile() {
	return (
		<AuthContext.Consumer>
			{({ profile, setProfile }) => (
				<div id='edit-profile-page' className='page'>
					<img className="profile-picture" src={profile.getProfileImage()} alt={profile.getName()} />
					
				</div>
			)}
		</AuthContext.Consumer>
	);
}