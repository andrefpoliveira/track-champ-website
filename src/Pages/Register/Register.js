import "./Register.css";
import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link, useNavigate } from "react-router-dom";

import { register } from "../../Logic/Requests/requests";
import AuthContext from "../../Logic/AppContext";

export default function RegisterPage() {
	const [isLoading, setIsLoading] = React.useState(false);
	const [errors, setErrors] = React.useState({});
	const { user } = React.useContext(AuthContext);
	const navigate = useNavigate();

	React.useLayoutEffect(() => {
		if (user !== null) {
			navigate('/')
		}
	})

	const handleSubmit = async (e) => {
		setIsLoading(true);

		e.preventDefault();

		const formData = new FormData(e.target);
		const formDataObj = Object.fromEntries(formData.entries());

		let validationErrors = validateForm(formDataObj);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			setIsLoading(false);
			return;
		}

		setErrors({});  // Clear errors if no validation issues

		let result = await register(formDataObj);
		
		setIsLoading(false);

		if (result.success) {
			navigate('/entrar');
			return;
		}
		
		let error = {};
		if (result.errors !== undefined) {
			result.errors.forEach(e => {
				error[e.field] = e.error;
			});
		} else {
			error[result.field] = result.error
		}
		setErrors(error);
		
	}

	const validateForm = (form) => {
		let validationErrors = {};

		let firstName = form.first_name.trim();
		let lastName = form.last_name.trim();
		let email = form.email.trim();
		let date = form.date.trim();
		let password = form.password.trim();

		// Custom validation for each field
		if (!firstName) {
			validationErrors.firstName = "O nome próprio é obrigatório.";
		}

		if (!lastName) {
			validationErrors.lastName = "O apelido é obrigatório.";
		}

		if (!email) {
			validationErrors.email = "O email é obrigatório.";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			validationErrors.email = "O formato de email é inválido.";
		}

		if (!date) {
			validationErrors.date = "A data é obrigatória.";
		}

		if (!password) {
			validationErrors.password = "A password é obrigatória.";
		} else if (password.length < 8) {
			validationErrors.password = "A password deve ter pelo menos 8 caracteres.";
		} else if (password.toLowerCase() === password) {
			validationErrors.password = "A password tem de ter pelo menos 1 letra maiúscula."
		} else if (password.toUpperCase() === password) {
			validationErrors.password = "A password tem de ter pelo menos 1 letra minúscula."
		} else if (!/\d/.test(password)) {
			validationErrors.password = "A password tem de ter pelo menos 1 número.";
		} else if (!/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)) {
			validationErrors.password = "A password tem de ter pelo menos 1 caracter especial.";
		}

		return validationErrors;
	};

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
							<Form.Control
								className={errors.firstName ? "form-error" : ""}
								type="text"
								name="first_name"
							/>
							{errors.firstName && <p className="form-error-label">{errors.firstName}</p>}
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="formLastName">
							<Form.Label><b>Apelido</b></Form.Label>
							<Form.Control
								className={errors.lastName ? "form-error" : ""}
								type="text"
								name="last_name"
							/>
							{errors.lastName && <p className="form-error-label">{errors.lastName}</p>}
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label><b>Email</b></Form.Label>
							<Form.Control
								className={errors.email ? "form-error" : ""}
								type="email"
								name="email"
							/>
							{errors.email && <p className="form-error-label">{errors.email}</p>}
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formDate">
							<Form.Label><b>Data de Nascimento</b></Form.Label>
							<Form.Control
								className={errors.date ? "form-error" : ""}
								type="date"
								name="date"
							/>
							{errors.date && <p className="form-error-label">{errors.date}</p>}
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="formGender">
							<Form.Label><b>Género</b></Form.Label>
							<Form.Select
								className={errors.gender ? "form-error" : ""}
								name="gender"
							>
								<option value="Masculino">Masculino</option>
								<option value="Feminino">Feminino</option>
								<option value="Outro">Outro</option>
								<option value="Prefiro não dizer">Prefiro não dizer</option>
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formPassword">
							<Form.Label><b>Password</b></Form.Label>
							<Form.Control
								className={errors.password ? "form-error" : ""}
								type="password"
								name="password"
							/>
							{errors.password && <p className="form-error-label">{errors.password}</p>}
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
					<span>Já tem uma conta? <Link disabled={isLoading} to={'/entrar'}><b>Entrar</b></Link></span>
				</Row>
			</Form>
		</div>
	);
}