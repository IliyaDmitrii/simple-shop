import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import DeviceBar from "../components/DeviceBar";
import BrandBar from "../components/BrandBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getBrands, getDevices, getTypes} from "../http/deviceApi";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {device} = useContext(Context)
    useEffect(()=>{
        getTypes().then(data => device.setTypes(data))
        getBrands().then(data => device.setBrands(data))
        getDevices(null,null,1,3).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    },[])

    useEffect(() => {
        getDevices(device.selectedType.id, device.selectedBrand.id, device.page, 9).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])
    return (
        <div>
            <Container>
                <Row >
                    <Col md={15} className="mt-5">
                        <TypeBar/>
                    </Col>
                    <Col md={8} className="mt-5" style={{marginLeft:25}}>
                        <BrandBar/>
                        <hr/>
                        <DeviceBar/>
                        <Pages/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Shop;