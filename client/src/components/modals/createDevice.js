import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import DropdownItem from "react-bootstrap/DropdownItem";
import {createDevice, getBrands, getDevices, getTypes} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show,onHide}) => {
    const {device} = useContext(Context)
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [info,setInfo] = useState([])
    const [file,setFile] = useState(null)
    const [brand,setBrand] = useState(null)
    const [type,setType] = useState(null)


    useEffect(()=>{
        getTypes().then(data => device.setTypes(data))
        getBrands().then(data => device.setBrands(data))
    },[])

    const addInfo = () => {
        setInfo([...info, {title: '' , description: '' , number: Date.now()}])
    }
    const changeInfo = (key,value,number) =>{
        setInfo(info.map(i => i.number === number ? {...i,[key]: value} : i))
    }
    const deleteInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const addDevice = () => {
        const formData  = new FormData()
        formData.append('name',name)
        formData.append('price',`${price}`)
        formData.append('img',file)
        formData.append('brandId',device.selectedBrand.id)
        formData.append('typeId',device.selectedType.id)
        formData.append('info',JSON.stringify(info))
        createDevice(formData).then(data => onHide())
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
                    Adauga un device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                  <Row style={{marginLeft:40}}>
                      <Dropdown>
                          <Dropdown.Toggle variant={'outline-warning'}

                              >
                                  {device.selectedType.name || 'Alegeti tipul'}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                              {device.types.map(type =>
                                  <Dropdown.Item onClick={() =>
                                                 device.setSelectedType(type)}
                                                 key={type.id}>
                                                 {type.name}
                                  </Dropdown.Item>
                              )}
                          </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown style={{marginLeft:20}}>
                          <Dropdown.Toggle variant={'outline-warning'}
                              >
                                  {device.selectedBrand.name || 'Alegeti brandul'}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                              {device.brands.map(brand =>
                                  <Dropdown.Item onClick={() =>
                                                 device.setSelectedBrand(brand)}
                                                 key={brand.id}>
                                                 {brand.name}
                                  </Dropdown.Item>
                              )}
                          </Dropdown.Menu>
                      </Dropdown>
                  </Row>
                  <Row style={{margin:40}}>
                      <Form.Control
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder={'Introdu numele'}
                      />
                      <hr/>
                      <Form.Control
                          placeholder={'Introdu pretul'}
                          type="number"
                          value={price}
                          onChange={e => setPrice(Number(e.target.value))}
                          className={'mt-3'}
                      />
                       <hr/>
                      <Form.Control
                          placeholder={'Introdu imaginea'}
                          type="file"
                          onChange={selectFile}
                          className={'mt-3'}
                      />
                      <hr/>
                      <Button className={'mt-3 '}
                              variant={'outline-warning'}
                              onClick={addInfo}>
                              Adauga o informatie
                      </Button>
                      {info.map(i =>
                          <Row className={'pt-4'} key={i.number}>
                              <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeInfo('title',e.target.value, i.number)}
                                        placeholder={'Introdu titlu'}
                                    />
                              </Col>
                              <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeInfo('description',e.target.value, i.number)}
                                        placeholder={'Introdu descrierea'}
                                    />
                              </Col>
                              <Col md={4}>
                                  <Button variant={'outline-danger'}
                                          onClick={() => deleteInfo(i.number)}>
                                      Sterge
                                  </Button>
                              </Col>
                          </Row>
                          )
                      }
                  </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Inchide</Button>
                <Button variant={'outline-success'} onClick={addDevice}>Adauga</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;