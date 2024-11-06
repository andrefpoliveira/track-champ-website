import './TeamsList.css';
import React from "react";

import { Placeholder, Card, Row, Col, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { FaPlus } from "react-icons/fa";

import AuthContext from '../../Logic/AppContext';

import { getTeams, update } from '../../Logic/Requests/requests';
import NewTeamModal from '../../Components/Modal/NewTeam/NewTeamModal';
import ToastContext from '../../Logic/ToastContext';

function TeamPlaceholder() {
	return (
		<Card>
			<Placeholder as='div' animation='glow'>
				<Placeholder className='team-picture' />
			</Placeholder>
			<div className='card-side-body'>
				<Placeholder as={Card.Title} animation='glow'>
					<Placeholder xs={12} />
				</Placeholder>
				<Placeholder className='card-description' as="span" animation='glow'>
					<Placeholder xs={7} /> <Placeholder xs={4} />
					<Placeholder xs={3} /> <Placeholder xs={3} /> <Placeholder xs={5} />
				</Placeholder>
				<Placeholder as="span" animation='glow'>
					<Placeholder xs={5} />
				</Placeholder>
			</div>
		</Card>
	);
}

function TeamCard(props) {
	return (
		<Card
			className='team-card'
			onClick={() => props.navigateFunction(props.id)}
		>
			<Card.Img className="team-picture" src='/images/defaultProfile.jpg' alt='team profile' />
			<div className='card-side-body'>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text className='card-description'>{props.description}</Card.Text>
				<span><i>{props.members} membro{props.members > 1 ? 's' : ''}</i></span>
			</div>
		</Card>
	)
}

export default function TeamsList() {
	const { deleteProfile } = React.useContext(AuthContext);
	const { showToast } = React.useContext(ToastContext);
	const [loading, setLoading] = React.useState(true);
	const [userTeams, setUserTeams] = React.useState([]);
	const [publicTeams, setPublicTeams] = React.useState([]);
	const navigate = useNavigate();

	// Create Team Modal
	const [modalShow, setModalShow] = React.useState(false);

	const fetchTeams = async () => {
		let result = await getTeams();

		if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			navigate('/');
		}

		if (result.success) {
			setUserTeams(result.user_teams);
			setPublicTeams(result.public_teams);
			setLoading(false);
		}
	}

	React.useEffect(() => {
		fetchTeams();
	}, [deleteProfile, navigate]);

	function updateTeams() {
		fetchTeams();
	}

	function navigateTeamPage(id) {
		navigate(`/equipa/${id}`);
	}

	return (
		<div id='teams-page' className='page'>

			<NewTeamModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				onTeamCreated={() => updateTeams()}
			/>

			<div id='my-teams'>
				<div className="section-header">
					<h2>As minhas equipas</h2>
					<div>
						<Button size='sm' onClick={() => setModalShow(true)}>
							<FaPlus size={15}/> Criar Equipa
						</Button>
					</div>
				</div>

				<>
					{
						loading
						? <Row xs={1} md={2} lg={3}>
							{
								Array(3).fill(1).map((_, i) => (
									<Col key={i}>
										<TeamPlaceholder />
									</Col>
								))
							}
						</Row>
						: userTeams.length === 0
							? <span>Não estás em nenhuma equipa... Experimenta criar a tua!</span>
							: <Row xs={1} md={2} lg={3}>
								{
									userTeams.map((team) => (
										<Col key={team.id}>
											<TeamCard
												id={team.id}									
												title={team.name}
												description={team.description}
												members={team.members}
												navigateFunction={navigateTeamPage}
											/>
										</Col>
									))
								}
							</Row>
					}
				</>
			</div>
			<div id='discover-teams'>
				<h2>Descobrir equipas</h2>
				<>
					{
						loading
						? <Row xs={1} md={2} lg={3}>
							{
								Array(3).fill(1).map((_, i) => (
									<Col key={i}>
										<TeamPlaceholder />
									</Col>
								))
							}
						</Row>
						: publicTeams.length === 0
							? <span>Não existem equipas em que te possas juntar... Experimenta criar a tua!</span>
							: <Row xs={1} md={2} lg={3}>
								{
									publicTeams.map((team) => (
										<Col key={team.id}>
											<TeamCard
												title={team.name}
												description={team.description}
												members={team.members}
											/>
										</Col>
									))
								}
							</Row>
					}
				</>
			</div>
		</div>
	);
}