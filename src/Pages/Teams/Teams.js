import './Teams.css';
import React from "react";

import { Placeholder, Card, Row, Col, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { FaPlus } from "react-icons/fa";

import AuthContext from '../../Logic/AppContext';

function TeamPlaceholder() {
	return (
		<Card>
			<Card.Img className="team-picture" src='/images/defaultProfile.jpg' alt='default team profile' />
			<div class='card-side-body'>
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
		<Card className='team-card'>
			<Card.Img className="team-picture" src='/images/defaultProfile.jpg' alt='team profile' />
			<div class='card-side-body'>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text class='card-description'>{props.description}</Card.Text>
				<span><i>{props.members} membro{props.members > 1 ? 's' : ''}</i></span>
			</div>
		</Card>
	)
}

export default function Teams() {
	const { user } = React.useContext(AuthContext);
	const [loading, setLoading] = React.useState(true);
	const [myTeams, setMyTeams] = React.useState([]);
	const [publicTeams, setPublicTeams] = React.useState([]);
	const navigate = useNavigate();

	return (
		<div id='teams-page' className='page'>
			<div id='my-teams'>
				<div className="section-header">
					<h2>As minhas equipas</h2>
					<div>
						<Button size='sm' onClick={() => {}} disabled>
							<FaPlus size={15}/> Criar Equipa
						</Button>
					</div>
				</div>
				<Row xs={1} md={2} lg={3}>
					{
						loading
						? Array(3).fill(1).map((input, i) => (
							<Col key={i}>
								<TeamPlaceholder />
							</Col>
						))
						: myTeams.length === 0
							? <span>Não estás em nenhuma equipa... Experimenta criar a tua!</span>
							: myTeams.map((team, i) => (
								<Col key={team.id}>
									<TeamCard
										title={team.title}
										description={team.description}
										members={team.members}
									/>
								</Col>
							))
					}
				</Row>
			</div>
			<div id='discover-teams'>
				<h2>Descobrir equipas</h2>
				<Row xs={1} md={2} lg={3}>
				{
						loading
						? Array(6).fill(1).map((input, i) => (
							<Col key={i}>
								<TeamPlaceholder />
							</Col>
						))
						: publicTeams.length === 0
							? <span>Não existem equipas nas quais possas entrar... Experimenta criar a tua!</span>
							: publicTeams.map((team, i) => (
								<Col key={team.id}>
									<TeamCard
										title={team.title}
										description={team.description}
										members={team.members}
									/>
								</Col>
							))
					}
				</Row>
			</div>
		</div>
	);
}