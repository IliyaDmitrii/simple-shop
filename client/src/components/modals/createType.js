import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/deviceApi";
import {Redirect} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";

const CreateType = ({show,onHide}) => {
    const [value,setValue] = useState('')
    const addType = () => {
        createType({name: value}).then(data => {
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
                    Adauga un tip
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                        placeholder={'Introdu numele tipului'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Inchide</Button>
                <Button variant={'outline-success'} onClick={addType}>Adauga</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;