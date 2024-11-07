import React from 'react';
import './InviteToTeam.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { inviteToTeam } from "../../../Logic/Requests/requests";
import { useNavigate } from "react-router-dom";
import ToastContext from '../../../Logic/ToastContext';
import AuthContext from '../../../Logic/AppContext';


export default function InviteToTeamModal(props) {
    const { showToast } = React.useContext(ToastContext);
    const { deleteProfile } = React.useContext(AuthContext);

    const [isLoading, setIsLoading] = React.useState(false);
	const [errors, setErrors] = React.useState({});

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

        formDataObj.team_id = props.teamId;
        
		let result = await inviteToTeam(formDataObj);

        setIsLoading(false);

        if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			props.onHide();
            navigate('/');
		}

		if (result.success) {
			showToast('Utilizador convidado com sucesso!');
            props.onHide();
            props.onPersonInvited();
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

		let username = form.username.trim();

		// Custom validation for each field
		if (!username) {
			validationErrors.username = "O nome de utilizador é obrigatório.";
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

            <div className='modal-page'>
                <Form
                    onSubmit={handleSubmit}
                >
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label><b>Nome de Utilizador</b></Form.Label>
                                <Form.Control
                                    className={errors.username ? "form-error" : ""}
                                    type="text"
                                    name="username"
                                    autoFocus
                                />
                                {errors.username && <p className="form-error-label">{errors.username}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="form-free-row mt-2">
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? 'Aguarda...' : 'Convidar'}
                        </Button>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
}