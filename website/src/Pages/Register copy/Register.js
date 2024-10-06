import "./Register.css";
import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

export default function RegisterPage() {
	return (
		<div id="register-page">
			<h1 className="mb-5">Cria uma conta!</h1>

			<Form>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formFirstName">
							<Form.Label><b>Nome Próprio</b></Form.Label>
							<Form.Control type="text" />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="formLastName">
							<Form.Label><b>Apelido</b></Form.Label>
							<Form.Control type="text" />
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label><b>Email</b></Form.Label>
							<Form.Control type="email" />
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formPassword">
							<Form.Label><b>Password</b></Form.Label>
							<Form.Control type="password" />
						</Form.Group>
					</Col>
				</Row>

				<Row className="form-free-row mb-2">
					<Button variant="primary" type="submit">
						Registar
					</Button>
				</Row>

				<Row className="form-free-row center-row">
					<span>Já tem uma conta? <Link to={'/login'}><b>Entrar</b></Link></span>
				</Row>
			</Form>
		</div>
	);
}