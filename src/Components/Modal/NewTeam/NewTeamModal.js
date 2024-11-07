import React from 'react';
import './NewTeamModal.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ChangeImageModal from '../ChangeImageModal/ChangeImageModal';

import { createTeam } from "../../../Logic/Requests/requests";
import ToastContext from '../../../Logic/ToastContext';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../Logic/AppContext';


export default function NewTeamModal(props) {
    const { showToast } = React.useContext(ToastContext);
    const { deleteProfile } = React.useContext(AuthContext);

    const [modalShow, setModalShow] = React.useState(false);
    const [imageSet, setImageSet] = React.useState(false);
    const [teamImage, setTeamImage] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(false);
	const [errors, setErrors] = React.useState({});
    const [isPublic, setIsPublic] = React.useState(false);

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
        
        formDataObj.public = isPublic;
        formDataObj.profile_image = teamImage;
        
		let result = await createTeam(formDataObj);

        setIsLoading(false);

        if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			props.onHide();
            navigate('/');
		}

		if (result.success) {
			showToast('Equipa criada com sucesso');
            props.onHide();
            props.onTeamCreated();
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

		let name = form.name.trim();
		let description = form.description.trim();

		// Custom validation for each field
		if (!name) {
			validationErrors.name = "O nome é obrigatório.";
		}

		if (!description) {
			validationErrors.description = "A descrição é obrigatória.";
		}

        return validationErrors;
	};

    return (
        <Modal
            id='new-team-modal'
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ChangeImageModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                existsAlready = {imageSet}
                choosePhoto={(img) => {
                    setImageSet(true);
                    setTeamImage(img);
                    setModalShow(false);
                }}
                deletePhoto={() => {
                    setImageSet(false);
                    setTeamImage(null);
                    setModalShow(false);
                }}
            />

            <div className='modal-page'>
                <img
					className="team-picture"
					src={teamImage || '/images/defaultProfile.jpg'}
					alt={'team profile'}
					onClick={() => setModalShow(false)}
				/>

                <Form
                    onSubmit={handleSubmit}
                >
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label><b>Nome</b></Form.Label>
                                <Form.Control
                                    className={errors.name ? "form-error" : ""}
                                    type="text"
                                    name="name"
                                    autoFocus
                                />
                                {errors.name && <p className="form-error-label">{errors.name}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label><b>Descrição</b></Form.Label>
                                <Form.Control
                                    className={errors.description ? "form-error" : ""}
                                    type="text"
                                    name="description"
                                />
                                {errors.description && <p className="form-error-label">{errors.description}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Check
                                type='checkbox'
                                id='public-checkbox'
                                label='Grupo Público'
                                checked={isPublic}
                                onChange={(e) => {setIsPublic(e.target.checked)}}
                            />
                        </Col>
                    </Row>

                    <Row className="form-free-row mt-2">
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? 'Aguarda...' : 'Criar Equipa'}
                        </Button>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
}