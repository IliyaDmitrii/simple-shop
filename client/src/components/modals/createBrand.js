import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand, createType} from "../../http/deviceApi";

const CreateBrand = ({show,onHide}) => {
    const [value,setValue] = useState('')
    const addDevice = () => {
        createBrand({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Adauga un brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                        placeholder={'Introdu numele brandului'}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Inchide</Button>
                <Button variant={'outline-success'} onClick={addDevice}>Adauga</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;