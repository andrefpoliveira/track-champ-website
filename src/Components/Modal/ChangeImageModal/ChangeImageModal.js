import './ChangeImageModal.css';

import React, { useState, useRef, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaImage, FaTrashAlt } from "react-icons/fa";
import Cropper from 'react-easy-crop';
import getCroppedImg from './getCroppedImg'; // Import the cropping utility function

export default function ChangeImageModal(props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
    const fileInputRef = useRef(null);

    const reset = () => {
        setSelectedImage(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedImage(null);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
    };

    const handleCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
        const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels);
        setCroppedImage(croppedImageUrl); // Set the cropped image
    }, [selectedImage]);

    const handleConfirmCrop = () => {
        // Call a function passed in as a prop to handle the cropped image
        props.choosePhoto(croppedImage); // You can modify this function name as needed

        reset();

        // Optionally close the modal
        props.onHide(); // Close the modal if needed
    };

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Mudar Foto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button onClick={handleImageClick}><FaImage /> Escolher foto</Button>
                {
                    props.existsAlready && selectedImage === null
                    ? <Button variant='danger' onClick={props.deletePhoto}><FaTrashAlt /> Apagar</Button>
                    : null
                }

                <input
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {/* Display Cropping Interface */}
                {selectedImage && (
                    <div style={{ position: 'relative', width: '100%', height: '300px', marginTop: '10px' }}>
                        <Cropper
                            image={selectedImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1} // Adjust the aspect ratio as needed
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                        />
                    </div>
                )}

                {/* Button to confirm cropped image */}
                {croppedImage && (
                    <Button onClick={handleConfirmCrop} style={{ marginTop: '10px' }}>
                        Confirmar
                    </Button>
                )}
            </Modal.Body>
        </Modal>
    );
}
