import React from 'react';
import './TestSession.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ToastContext from '../../../Logic/ToastContext';

import { getTestCategories } from '../../../Logic/Requests/requests';
import AuthContext from '../../../Logic/AppContext';
import { useNavigate } from 'react-router-dom';

import TestFormsConfig from '../../TestForms/TestFormsConfig'; 

export default function TestSessionModal(props) {
    const navigate = useNavigate();
    const { showToast } = React.useContext(ToastContext);
    const { deleteProfile } = React.useContext(AuthContext);

    const [ category, setCategory ] = React.useState(null);
    const [ categories, setCategories ] = React.useState([]);
    const [ test, setTest ] = React.useState(null);
    const [ tests, setTests ] = React.useState([]);

    React.useEffect(() => {
		getCategories();
	}, []);

    const getCategories = async () => {
        let result = await getTestCategories();

        if (result.statusCode === 307) {
			showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
			deleteProfile();
			props.onHide();
            navigate('/');
		}

        if (result.success) {
            setCategory(result.categories[0].name);
            setCategories(result.categories);

            if (result.categories[0].tests !== undefined) {
                setTest(result.categories[0].tests[0].name)
                setTests(result.categories[0].tests);
            }
        }
    }

    const handleFinish = () => {
        props.onHide();
    }

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setCategory(category);

        categories.forEach((c) => {
            if (c.label === category) {
                setTests(c.tests ? c.tests : []);
                setTest(c.tests ? c.tests[0] : null);
                return;
            }
        })
    }

    const handleTestChange = (e) => {
        const test = e.target.value;
        setTest(test);
    }

    const getTestForm = () => {
        const TestForm = TestFormsConfig[category]?.[test] || null;

        return (
            TestForm
            ? <TestForm />
            : null
        )
    }

    return (
        <Modal
            id='new-test-modal'
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <div className='modal-page'>
                <div className='modal-header'>
                    <h4>Sessão de Testes</h4>
                    <Button
                        variant='success'
                        onClick={handleFinish}
                    >
                        Terminar
                    </Button>
                </div>
                <Row xs={1} md={2} lg={2} className='modal-test-definition'>
                    <Col>
                        <Form.Label><b>Categoria</b></Form.Label>
                        <Form.Select
                            aria-label='Test Category Selection'
                            onChange={handleCategoryChange}
                        >
                            {
                                categories.map((c) => (
                                    <option value={c.name}>{c.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Col>

                    {
                        tests.length > 0
                        ? <Col>
                            <Form.Label><b>Teste</b></Form.Label>
                            <Form.Select
                                aria-label='Test Category Selection'
                                onChange={handleTestChange}
                            >
                                {
                                    tests.map((t) => (
                                        <option value={t.name}>{t.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Col>
                        : null
                    }
                </Row>
                <Row className='athlete-selection'>
                    {
                        <Col>
                            <Form.Label><b>Atleta</b></Form.Label>
                            <Form.Select
                                aria-label='Athlete Selection'
                                onChange={() => {}}
                            >
                                {

                                }
                            </Form.Select>
                        </Col>
                    }
                </Row>
                {
                    getTestForm()
                }
            </div>
        </Modal>
    );
}