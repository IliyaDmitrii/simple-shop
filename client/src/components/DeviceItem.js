import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useHistory} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <Col md={3} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)} style={{marginRight:20}}>
            <Card style={{width: 180, height: 270, cursor: "pointer",padding:15 , marginTop: 12}}>
                <Image width={150} style={{paddingBottom:10}} src={process.env.REACT_APP_API_URL + device.img}/>
                <div >
                    <div>{device.name}</div>
                </div>
                <div className="d-flex align-items-center mt-auto">
                    <div className={"text-secondary"}>Price : {device.price} lei</div>
                    <div className="d-flex align-items-center ml-auto">
                        <div>{device.rating}</div>
                        <Image src={star} style={{paddingTop:2}}/>
                    </div>
                </div>
            </Card>
        </Col>
    );
}

export default DeviceItem;