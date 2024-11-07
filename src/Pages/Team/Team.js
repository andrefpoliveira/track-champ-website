import './Team.css';
import React from "react";

import { Card, Row, Col, Tabs, Tab } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';

import { PiCrownSimpleFill } from "react-icons/pi";
import { RiPoliceBadgeFill } from "react-icons/ri";

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
						<img className="profile-picture" src='/images/defaultProfile.jpg' alt={'team profile'} />
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
										<Col>
											<Card>
												{}
												<img className='member-image' src={user.profile_image || '/images/defaultProfile.jpg'} alt={user.first_name} />
												{user.first_name} {user.last_name}
												{
													user.is_creator
													? <PiCrownSimpleFill color='#e4cd05'/>
													: user.is_admin
														? <RiPoliceBadgeFill color='#0047ab'/>
														: null
												}
											</Card>
										</Col>
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