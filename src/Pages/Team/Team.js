import './Team.css';
import React from "react";

import { Card, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';

import { PiCrownSimpleFill } from "react-icons/pi";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { RxEnter } from "react-icons/rx";
import { RxExit } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SiVitest } from "react-icons/si";

import AuthContext from '../../Logic/AppContext';
import ToastContext from '../../Logic/ToastContext';

import InviteToTeamModal from '../../Components/Modal/InviteToTeam/InviteToTeam';
import TestSessionModal from '../../Components/Modal/TestSession/TestSession';

import { getTeam, enterTeam, exitTeam, deleteTeam } from '../../Logic/Requests/requests';
import { resolveImagePath } from '../../Logic/Utils/images';

import { promoteUser, depromoteUser } from '../../Logic/Requests/requests';

export default function Team() {
	const { id } = useParams();

	const { user, deleteProfile } = React.useContext(AuthContext);
	const { showToast } = React.useContext(ToastContext);

	const [teamInfo, setTeamInfo] = React.useState({});
	const [inviteModalShow, setInviteModalShow] = React.useState(false);
	const [testModalShow, setTestModalShow] = React.useState(false);

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

	const handleDeleteTeamButton = async () => {
		let result = await deleteTeam(teamInfo.team.id);

		if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			navigate('/');
		}

		if (result.success) {
			showToast('Apagaste equipa. A voltar à página das equipas');
			navigate('/equipas')
		}
	}

	const promote = async (userId) => {
		let result = await promoteUser({
			'user_id': userId,
			'team_id': teamInfo.team.id
		})

		if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			navigate('/');
		}

		if (result.success) {
			showToast('Membro promovido.');
			fetchTeam();
		}
	}

	const depromote = async (userId) => {
		let result = await depromoteUser({
			'user_id': userId,
			'team_id': teamInfo.team.id
		})

		if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			navigate('/');
		}

		if (result.success) {
			showToast('Membro despromovido.');
			fetchTeam();
		}
	}

	return (
		<>
			{
				loading
				? null
				: <>
					<InviteToTeamModal
						show={inviteModalShow}
						onHide={() => setInviteModalShow(false)}
						onPersonInvited={() => fetchTeam()}
						teamId={teamInfo.team.id}
					/>

					<TestSessionModal
						show={testModalShow}
						onHide={() => setTestModalShow(false)}
					/>
					
					<div id='team-page' className='page'>
						<div id='team-header'>
							<div className='team-header-info'>
								<img
									className="team-picture"
									src={resolveImagePath(teamInfo.team.profile_image || '/images/defaultProfile.jpg')}
									alt={'team profile'}
								/>
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
										? <>
											<Button
												onClick={() => setTestModalShow(true)}
											>
												<SiVitest />Sessão de Testes
											</Button>
											<Button
												onClick={() => setInviteModalShow(true)}
											>
												<IoMdPersonAdd />Convidar
											</Button>
										</>
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
										? <Button
											variant='danger'
											onClick={() => handleDeleteTeamButton()}
										>
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
								<Row xs={1} md={2} lg={3}>
									{
										teamInfo.users.map((member) => (
											<Col>
												<Card>
													<div>
														<img
															className='member-image'
															src={resolveImagePath(member.profile_image || '/images/defaultProfile.jpg')}
															alt={member.first_name}
														/>
														{member.first_name} {member.last_name}
														{
															member.is_creator
															? <PiCrownSimpleFill color='#e4cd05'/>
															: member.is_admin
																? <RiPoliceBadgeFill color='#0047ab'/>
																: null
														}
														<span>{member.is_admin}</span>
													</div>
													{
														member.id !== user.getId() && (teamInfo.user.is_creator || teamInfo.user.is_admin)
														? <Dropdown>
															<DropdownButton
																variant="link"
																id="dropdown-basic-button"
																drop='down-centered'
																title={<BsThreeDotsVertical />} // This will render the 3 dots icon as the button
															>
																{
																	member.is_admin === false
																	? <Dropdown.Item onClick={() => promote(member.id)}>Promover a administrador</Dropdown.Item>
																	: <Dropdown.Item onClick={() => depromote(member.id)}>Despromover de administrador</Dropdown.Item>
																}
															</DropdownButton>
														</Dropdown>
														: null
													}
												</Card>
											</Col>
										))
									}
								</Row>
							</Tab>

							<Tab eventKey='compare' title='Análise'>
								Análise
							</Tab>
						</Tabs>
					</div>
				</>
			}
		</>
	);
}