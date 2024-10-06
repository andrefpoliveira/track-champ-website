import "./Login.css";
import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link, useNavigate } from "react-router-dom";

import { login } from "../../Logic/Requests/requests";

export default function LoginPage() {
	const [isLoading, setIsLoading] = React.useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const formData = new FormData(e.target);
		const formDataObj = Object.fromEntries(formData.entries());

		let validForm = validateForm(formDataObj);

		if (!validForm) {
			alert("Preencha todos os campos!");
			setIsLoading(false);
			return;
		}

		let result = await login(formDataObj);

		if (result.success) {
			alert("Login com sucesso!");
			navigate('/');
		} else {
			alert("Erro ao entrar!");
		}
	}

	const validateForm = (form) => {
		let valid = true;
		for (const [_, value] of Object.entries(form)) {
			if (!value) {
				valid = false;
			}
		}

		return valid;
	}

	return (
		<div id="login-page">
			<h1 className="mb-5">Bem-vindo de volta!</h1>

			<Form onSubmit={handleSubmit}>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label><b>Email</b></Form.Label>
							<Form.Control type="email" name="email" />
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formPassword">
							<Form.Label><b>Password</b></Form.Label>
							<Form.Control type="password" name="password" />
						</Form.Group>
					</Col>
				</Row>

				<Row className="mb-3">
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
					<Button
						disabled={isLoading}
						type="submit"
					>
						{isLoading ? 'Aguarda...' : 'Entrar'}
					</Button>
				</Row>

				<Row className="form-free-row center-row">
					<span>Ainda não tens conta? <Link disabled={isLoading} to={'/register'}><b>Registar</b></Link></span>
				</Row>
			</Form>
		</div>
	);
}