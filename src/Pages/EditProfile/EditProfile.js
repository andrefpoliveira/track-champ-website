import './EditProfile.css';
import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useNavigate } from "react-router-dom";

import { update } from '../../Logic/Requests/requests';
import AuthContext from '../../Logic/AppContext';
import ToastContext from '../../Logic/ToastContext';
import ChangeImageModal from '../../Components/Modal/ChangeImageModal/ChangeImageModal'
import { resolveImagePath } from '../../Logic/Utils/images';


export default function EditProfile() {
	const { user, storeProfile, deleteProfile } = React.useContext(AuthContext);
	const { showToast } = React.useContext(ToastContext);

	const [isLoading, setIsLoading] = React.useState(false);
	const [errors, setErrors] = React.useState({});
	const [modalShow, setModalShow] = React.useState(false);
	const [profileImage, setProfileImage] = React.useState(user.getProfileImage());
	const [imageSet, setImageSet] = React.useState(!user.getProfileImage().includes('/defaultProfile'))
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

		formDataObj['profile_image'] = profileImage.includes('/defaultProfile') ? null : profileImage;
		let result = await update(formDataObj);
		
		setIsLoading(false);

		if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			navigate('/')
		}

		if (result.success) {
			showToast('Perfil atualizado com sucesso');

			let info = result.info;
			storeProfile(info);
			navigate('/meu-perfil')
			return;
		}

		
		let error = {};
		error[result.field] = result.error;
		setErrors(error);
		
	}

	const validateForm = (form) => {
		let validationErrors = {};

		let firstName = form.first_name.trim();
		let lastName = form.last_name.trim();
		let username = form.username.trim();
		let email = form.email.trim();
		let date = form.date.trim();

		// Custom validation for each field
		if (!firstName) {
			validationErrors.firstName = "O nome próprio é obrigatório.";
		}

		if (!lastName) {
			validationErrors.lastName = "O apelido é obrigatório.";
		}

		if (!username) {
			validationErrors.username = "O nome de utilizador é obrigatório.";
		}

		if (!email) {
			validationErrors.email = "O email é obrigatório.";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			validationErrors.email = "O formato de email é inválido.";
		}

		if (!date) {
			validationErrors.date = "A data é obrigatória.";
		}

		return validationErrors;
	};

	return (
		<div id='edit-profile-page' className='page'>
			<ChangeImageModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				existsAlready = {imageSet}

				choosePhoto={(img) => {
					setImageSet(true);
					setProfileImage(img);
					setModalShow(false);
				}}
				deletePhoto={() => {
					setProfileImage('/images/defaultProfile.jpg');
					setImageSet(false);
					setModalShow(false);
				}}
			/>

			<div className='header'>
				<img
					className="profile-picture"
					src={
						profileImage.startsWith('/')
						? resolveImagePath(profileImage)
						: profileImage
					}
					alt={user.getName()}
					onClick={() => setModalShow(true)}
				/>
			</div>
			
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
								defaultValue={user.getFirstName()}
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
								defaultValue={user.getLastName()}
							/>
							{errors.lastName && <p className="form-error-label">{errors.lastName}</p>}
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formUsername">
							<Form.Label><b>Nome de Utilizador</b></Form.Label>
							<Form.Control
								className={errors.username ? "form-error" : ""}
								type="text"
								name="username"
								defaultValue={user.getUsername()}
							/>
							{errors.username && <p className="form-error-label">{errors.username}</p>}
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label><b>Email</b></Form.Label>
							<Form.Control
								className={errors.email ? "form-error" : ""}
								type="email"
								name="email"
								defaultValue={user.getEmail()}
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
								defaultValue={new Date(user.getBirthday()).toISOString().split('T')[0]}
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
								defaultValue={user.getGender() || ""}
							>
								<option value="Masculino">Masculino</option>
								<option value="Feminino">Feminino</option>
								<option value="Outro">Outro</option>
								<option value="Prefiro não dizer">Prefiro não dizer</option>
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>

				<Row className="form-free-row mb-2">
					<Button
						disabled={isLoading}
						type="submit"
					>
						{isLoading ? 'Aguarda...' : 'Atualizar conta'}
					</Button>
				</Row>
			</Form>

		</div>
	);
}