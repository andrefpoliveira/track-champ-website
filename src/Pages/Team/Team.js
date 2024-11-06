import './Team.css';
import React from "react";

import { Placeholder, Card, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';


import AuthContext from '../../Logic/AppContext';

import { getTeam } from '../../Logic/Requests/requests';
import ToastContext from '../../Logic/ToastContext';

export default function Team() {
	const { id } = useParams();

	const { deleteProfile } = React.useContext(AuthContext);
	const { showToast } = React.useContext(ToastContext);

	const [teamInfo, setTeamInfo] = React.useState({});

	const [loading, setLoading] = React.useState(true);
	const navigate = useNavigate();

	const fetchTeam = async () => {
		let result = await getTeam(id);

		if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			navigate('/');
		}

		if (result.success) {
			setTeamInfo(result.info);
			setLoading(false);
		}
	}

	React.useEffect(() => {
		fetchTeam();
	}, [deleteProfile, navigate]);

	return (
		<>
			{
				loading
				? null
				: <div id='team-page' className='page'>
					<div id='profile-header'>
						<img className="profile-picture" src='/images/defaultProfile.jpg' alt={'team image'} />
						<div id='profile-info'>
							<h2>{teamInfo.team.name}</h2>
							<h4>{teamInfo.team.description}</h4>
						</div>
					</div>

					<Tabs
						defaultActiveKey='members'
						className="mb-3"
					>
						<Tab eventKey='members' title='Membros'>
							<Row xs={2} md={3} lg={4}>
								{
									teamInfo.users.map((user) => (
										<Card>
											{user.first_name} {user.last_name}
										</Card>
									))
								}
							</Row>
						</Tab>

						<Tab eventKey='compare' title='Comparar'>
							Comparar
						</Tab>
					</Tabs>
				</div>
			}
		</>
	);
}