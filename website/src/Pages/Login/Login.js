import "./Login.css";
import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link, useNavigate } from "react-router-dom";

import { login } from "../../Logic/Requests/requests";
import Profile from "../../Logic/Profile";
import AuthContext from "../../Logic/AppContext";

export default function LoginPage() {
	const [isLoading, setIsLoading] = React.useState(false);
	const [errors, setErrors] = React.useState({});
	const { setProfile } = React.useContext(AuthContext);
	const navigate = useNavigate();

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

		let result = await login(formDataObj);

		if (result.success) {
			let info = result['info'];

			let profile = new Profile(
				info['account_id'],
				info['username'],
				info['name'],
				info['birthday'],
				info['gender'],
				info['profile_image']
			);

			setProfile(profile);

			navigate('/');
		}

		setIsLoading(false);
	}

	const validateForm = (form) => {
		let validationErrors = {};

		let email = form.email.trim();
		let password = form.password.trim();

		if (!email) {
			validationErrors.email = "O email é obrigatório.";
		}

		if (!password) {
			validationErrors.password = "A password é obrigatória.";
		}

		return validationErrors;
	};

	return (
		<div id="login-page">
			<h1 className="mb-5">Bem-vindo de volta!</h1>

			<Form onSubmit={handleSubmit}>
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
					<span>Ainda não tens conta? <Link disabled={isLoading} to={'/registar'}><b>Registar</b></Link></span>
				</Row>
			</Form>
		</div>
	);
}