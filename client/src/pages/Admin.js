import React,{useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/createBrand";
import CreateDevice from "../components/modals/createDevice";
import CreateType from "../components/modals/createType";

const Admin = () => {
    const [modalShowType, setModalShowType] = useState(false)
    const [modalShowBrand, setModalShowBrand] = useState(false)
    const [modalShowDevice, setModalShowDevice] = useState(false)
    return (
        <Container className="d-flex flex-column" style={{width:250,float:'left',marginLeft: 140,marginTop:50}}>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setModalShowBrand(true)}
            >
                Adauga Brand
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setModalShowType(true)}
            >
                Adauga Tip
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setModalShowDevice(true)}
            >
                Adauga Device
            </Button>

            <CreateBrand show={modalShowBrand} onHide={()=> setModalShowBrand(false)}/>
            <CreateType show={modalShowType} onHide={()=> setModalShowType(false)}/>
            <CreateDevice show={modalShowDevice} onHide={()=> setModalShowDevice(false)}/>
        </Container>
    );
};

export default Admin;