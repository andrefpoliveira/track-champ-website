import React from 'react';
import './TrackTiming.css';
import '../TestForms.css'

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdSave } from "react-icons/md";


export function TrackTimingDisplay(props) {
    let distances = [
        ...new Set(props.results.flat().map(r => r.distance))
    ].sort((a, b) => a - b);

    const getDistanceValue = (result, distance) => {
        for (let i = 0; i < result.length; i++) {
            var r = result[i];

            if (r.distance === distance) {
                return r.time;
            }
        }

        return null;
    }

    return (
        <div id='track-timing-display'>
            {
                distances.length === 0
                ? null
                : <div className='test-display'>
                    <Table responsive>
                        <thead>
                            <tr>
                                {
                                    distances.map((d) => (
                                        <th key={d}>{d}m</th>
                                    ))
                                }
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.results.map((result, index) => (
                                    <tr key={index}>
                                        {
                                            distances.map((d) => (
                                                <td key={`${index} ${d}`}>
                                                    {
                                                        getDistanceValue(result, d)
                                                        ? <span key={`${index} ${d}`}>{Number(getDistanceValue(result, d)).toFixed(3)}s</span>
                                                        : null
                                                    }
                                                </td>
                                            ))
                                        }
                                        <td>
                                            <MdDelete
                                                color='#ff0000'
                                                onClick={() => props.onDelete(index)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    )
}

export function TrackTimingForm(props) {
    const [ active, setActive ] = React.useState(false);
    const [ step, setStep ] = React.useState(0);
    const [ results, setResults ] = React.useState(new Array(props.distances.length).fill(''));

    const inputRef = React.useRef(null);

    const previousStep = () => {
        setStep(step - 1);
    }

    const nextStep = () => {
        let newStep = step + 1;
        setStep(newStep);

        if (newStep >= props.distances.length) {

            let finalResults = [];
            for (let i = 0; i < props.distances.length; i++) {
                if (results[i] !== '') {
                    finalResults.push({
                        distance: props.distances[i],
                        time: Number(results[i]).toFixed(3)
                    });
                }
            }

            setStep(0);
            setActive(false);
            props.onSubmit(finalResults);
            setResults(new Array(props.distances.length).fill(''));
        }
    }

    const updateValue = (e) => {
        let newResults = [...results];
        let value = e.target.value;

        newResults[step] = value;

        setResults(newResults);
    }

    return (
        <div className='test-form track-timing-form'>
            {
                !active
                ? <div className='add-result'>
                    <Button className='left-icon' onClick={() => setActive(true)} size='sm'>
                        <MdAdd size={20}/>
                        Novo resultado
                    </Button>
                </div>
                : <div className='create-result'>
                    <Row xs={2} md={4} lg={4}>
                        <Col>
                            <span><b>{props.distances[step]}m</b></span>
                        </Col>
                        <Col key={step}>
                            <Form.Control
                                type='number'
                                autoFocus
                                placeholder='0.000'
                                value={results[step] || ''}
                                onChange={updateValue}
                            />
                        </Col>
                        <Col>
                            <div>
                                <Button
                                    disabled={step===0}
                                    size='sm'
                                    onClick={previousStep}
                                    className='left-icon'
                                >
                                    <MdNavigateBefore size={20}/>
                                    Anterior
                                </Button>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Button
                                    variant={step === props.distances.length - 1 ? 'success' : 'primary'}
                                    className={step === props.distances.length - 1 ? 'left-icon' : 'right-icon'}
                                    size='sm'
                                    onClick={nextStep}
                                >
                                    {
                                        step === props.distances.length - 1
                                        ? <>
                                            <MdSave size={20}/>
                                            Guardar
                                        </>
                                        : <>
                                            Próximo
                                            <MdNavigateNext size={20}/>
                                        </>
                                    }
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    );
}