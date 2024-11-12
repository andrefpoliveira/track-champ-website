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

import { TestFormsDisplay, TestFormsConfig } from '../../TestForms/TestFormsConfig'; 

import { FaCheck } from "react-icons/fa";

export default function TestSessionModal(props) {
    const navigate = useNavigate();
    const { showToast } = React.useContext(ToastContext);
    const { deleteProfile } = React.useContext(AuthContext);

    const [ category, setCategory ] = React.useState({});
    const [ categories, setCategories ] = React.useState([]);

    const [ test, setTest ] = React.useState({});
    const [ tests, setTests ] = React.useState([]);

    const [ athleteId, setAthleteId] = React.useState(props.members[0].id);

    const [ results, setResults ] = React.useState([]);

    React.useEffect(() => {
        const getCategories = async () => {
            let result = await getTestCategories();
    
            if (result.statusCode === 307) {
                showToast('A tua sessão expirou... Inicia sessão outra vez', 'warning')
                deleteProfile();
                props.onHide();
                navigate('/');
            }
    
            if (result.success) {
                setCategory(result.categories[0]);
                setCategories(result.categories);
    
                if (result.categories[0].tests !== undefined) {
                    setTest(result.categories[0].tests[0])
                    setTests(result.categories[0].tests);
                }
            }
        }

		getCategories();
	}, [deleteProfile, navigate, props, showToast]);

    
    const handleFinish = () => {
        props.onHide();
        setResults([]);
    }

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        
        categories.forEach((c) => {
            if (c.label === category) {
                setCategory(c);
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

    const handleAthleteChange = (e) => {
        const id = parseInt(e.target.value);
        setAthleteId(id);
    }

    const submitResult = (result) => {
        results.push({
            'category': category.id,
            'test': test.id,
            'athlete': parseInt(athleteId),
            'result': result
        });

        setResults([...results]);
    }

    const onDeleteResult = React.useCallback((index) => {
        let newResults = [...results];

        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.category === category.id && result.test === test.id && result.athlete === athleteId) {
                if (index === 0) {
                    newResults.splice(i, 1);
                    setResults(newResults);
                    return
                }
                index -= 1;
            }
        }
    }, [athleteId, category.id, results, test.id])

    const getTestDisplay = React.useMemo(() => {
        const TestDisplay = TestFormsDisplay[category.name]?.[test.name] || null;

        const relevantResults = results
        .filter((r) => r.category === category.id && r.test === test.id && r.athlete === athleteId)
        .map((r) => r.result);

        return (
            TestDisplay
            ? <TestDisplay
                key={relevantResults.length}
                results={relevantResults}
                onDelete={onDeleteResult}
            />
            : null
        )
    }, [results, category, test, athleteId, onDeleteResult]);

    const getTestForm = () => {
        const TestForm = TestFormsConfig[category.name]?.[test.name] || null;

        return (
            TestForm
            ? <TestForm
                onSubmit={submitResult}
                distances = {[10, 20, 30, 40, 50, 60]}
            />
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
            backdrop="static"
        >

            <div className='modal-page test-session-page'>
                <div className='modal-header'>
                    <h4>Sessão de Testes</h4>
                    <Button
                        variant='success'
                        onClick={handleFinish}
                        size='sm'
                        className='left-icon'
                    >
                        <FaCheck />
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
                                    <option key={c.name} value={c.name}>{c.name}</option>
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
                                        <option key={t.name} value={t.name}>{t.name}</option>
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
                                onChange={handleAthleteChange}
                            >
                                {
                                    props.members.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.fullName}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Col>
                    }
                </Row>
                {
                    getTestDisplay
                }
                {
                    getTestForm()
                }
            </div>
        </Modal>
    );
}