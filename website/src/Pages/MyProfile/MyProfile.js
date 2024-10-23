import './MyProfile.css';
import React from "react";

import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import Moment from 'moment';

import { FaCalendarAlt } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

import AuthContext from '../../Logic/AppContext';

export default function MyProfile() {
	const { user } = React.useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<div id='profile-page' className='page'>
			<div id='profile-header'>
				<img className="profile-picture" src={user.getProfileImage()} alt={user.getName()} />
				<div id='profile-info'>
					<h2>{user.getName()}</h2>
					<div className='line'>
						<FaHashtag />
						<span>{user.getUsername()}</span>
					</div>
					<div className='line'>
						<FaCalendarAlt />
						<span>{Moment(user.getBirthday()).format('DD/MM/YYYY')}</span>
					</div>
				</div>
			</div>

			<div id='profile-action-buttons'>
				<Button size='sm' onClick={() => navigate('/editar-perfil')}>
					<FaUserEdit size={20}/> Editar Perfil
				</Button>
			</div>
		</div>
	);
}