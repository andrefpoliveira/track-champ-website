import "./Register.css";
import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link, useNavigate } from "react-router-dom";


import { register } from "../../Logic/Requests/requests";

export default function RegisterPage() {
	const [isLoading, setIsLoading] = React.useState(false);
	const [validated, setValidated] = React.useState(false);

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

		let result = await register(formDataObj);

		if (result.success) {
			alert("Conta criada com sucesso!");
			navigate('/login');
		} else {
			alert("Erro ao criar conta!");
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
		<div id="register-page">
			<h1 className="mb-5">Cria uma conta!</h1>

			<Form
				onSubmit={handleSubmit}
			>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formFirstName">
							<Form.Label><b>Nome Próprio</b></Form.Label>
							<Form.Control type="text" name="firstName" />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="formLastName">
							<Form.Label><b>Apelido</b></Form.Label>
							<Form.Control type="text" name="lastName" />
						</Form.Group>
					</Col>
				</Row>

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
						<Form.Group className="mb-3" controlId="formBirthday">
							<Form.Label><b>Data de Nascimento</b></Form.Label>
							<Form.Control type="date" name="birthday" />
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

				<Row className="form-free-row mb-2">
					<Button
						disabled={isLoading}
						type="submit"
					>
						{isLoading ? 'Aguarda...' : 'Criar conta'}
					</Button>
				</Row>

				<Row className="form-free-row center-row">
					<span>Já tem uma conta? <Link disabled={isLoading} to={'/login'}><b>Entrar</b></Link></span>
				</Row>
			</Form>
		</div>
	);
}