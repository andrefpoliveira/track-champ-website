import React from 'react';
import '../TestForms.css'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

import { MdOutlineClose } from "react-icons/md";

export function TrackTimingDisplay(props) {
    return (
        <div className='test-display'>
            {
                props.results.map((r, index) => (
                    <Row key={index} xs={1} md={2} lg={3}>
                        <span>{r}</span>
                    </Row>
                ))
            }
        </div>
    )
}

export function TrackTimingForm(props) {
    const [ distances, setDistances ] = React.useState([10, 20, 30, 40, 50, 60]);
    return (
        <div className='test-form'>
            <Row xs={3} md={6} lg={6}>
                {
                    distances.map((d) => (
                        <>
                        <Col key={d}>
                            <Form.Control
                                type='number'
                                defaultValue={d}
                                id={`input${d}`}
                            />
                        </Col>

                        <Col>
                            <Form.Control
                                type='number'
                                id={`input${d}`}
                            />
                        </Col>

                        <Col auto>
                            <MdOutlineClose size={25}/>
                        </Col>
                        </>
                    ))
                }
                <Button onClick={() => props.onSubmit(0)}>Adicionar</Button>
            </Row>
        </div>
    );
}