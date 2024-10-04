import "./Login.css";
import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

export default function LoginPage() {
	return (
		<div id="login-page">
			<h1 className="mb-5">Bem-vindo de volta!</h1>

			<Form>
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

				<Row className="mb-3" >
					<Col>
						<Form.Group controlId="formRemember">
							<Form.Check type="checkbox" label="Lembrar-me" />
						</Form.Group>
					</Col>
					<Col className="text-right">
						<Link to={'/forgot-password'}>Esqueci-me da password</Link>
					</Col>
				</Row>

				<Row className="form-free-row mb-2">
					<Button type="submit">
						Entrar
					</Button>
				</Row>

				<Row className="form-free-row center-row">
					<span>Ainda não tens conta? <Link to={'/register'}><b>Registar</b></Link></span>
				</Row>
			</Form>
		</div>
	);
}