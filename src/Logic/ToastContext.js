import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
    const [show, setShow] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [variant, setVariant] = React.useState('success');

    const showToast = (message, variant = 'success') => {
        setMessage(message);
        setVariant(variant);
        setShow(true);
    }

    const hideToast = () => setShow(false);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            <ToastContainer position='top-end' style={{margin: '1rem 1rem 0 0'}}>
                <Toast onClose={hideToast} show={show} delay={3000} autohide bg={variant}>
                    <Toast.Body
                        className='text-white'
                    >
                        <strong>{ message }</strong>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            { children }
        </ToastContext.Provider>
    )
}

export default ToastContext;