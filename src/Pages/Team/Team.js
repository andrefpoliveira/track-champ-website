import './Team.css';
import React from "react";

import { Card, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';

import { PiCrownSimpleFill } from "react-icons/pi";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { RxEnter } from "react-icons/rx";
import { RxExit } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";
import { RiDeleteBin7Fill } from "react-icons/ri";

import AuthContext from '../../Logic/AppContext';
import ToastContext from '../../Logic/ToastContext';

import { getTeam, enterTeam, exitTeam } from '../../Logic/Requests/requests';

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

	const handleEnterTeamButton = async () => {
		let result = await enterTeam(teamInfo.team.id);

		if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			navigate('/');
		}

		if (result.success) {
			showToast('Bem-vindo à equipa!');
			fetchTeam();
		}
	}

	const handleExitTeamButton = async () => {
		let result = await exitTeam(teamInfo.team.id);

		if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			navigate('/');
		}

		if (result.success) {
			showToast('Saiste da equipa. A voltar à página das equipas');
			navigate('/equipas')
		}
	}

	return (
		<>
			{
				loading
				? null
				: <div id='team-page' className='page'>
					<div id='team-header'>
						<div className='team-header-info'>
							<img className="team-picture" src='/images/defaultProfile.jpg' alt={'team profile'} />
							<div id='team-info'>
								<h2>{teamInfo.team.name}</h2>
								<h4>{teamInfo.team.description}</h4>
							</div>
						</div>
						<span>{teamInfo.user.joined}</span>
						{
							!loading
							? <div className='team-header-buttons'>
								{
									teamInfo.user.is_admin || teamInfo.user.is_creator
									? <Button disabled>
										<IoMdPersonAdd />Convidar
									</Button>
									: null
								}
								{
									!teamInfo.user.joined
									? <Button
										onClick={() => handleEnterTeamButton()}
									>
										<RxEnter />Entrar
									</Button>
									: null
								}
								{
									!(teamInfo.user.is_admin || teamInfo.user.is_creator) && teamInfo.user.joined
									? <Button
										onClick={() => handleExitTeamButton()}
									>
										<RxExit />Sair
									</Button>
									: null
								}
								{
									teamInfo.user.is_creator
									? <Button variant='danger' disabled>
										<RiDeleteBin7Fill />Apagar
									</Button>
									: null
								}
							</div>
							: null
						}
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