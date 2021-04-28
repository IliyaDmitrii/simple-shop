import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Row} from "react-bootstrap";
import {Context} from "../index";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
       <Row className="d-flex flex-row">
           {device.brands.map(brand =>
               <Card
                   key={brand.id}
                   className="p-2 mb-2"
                   style={{cursor:"pointer"}}
                   onClick={() => device.setSelectedBrand(brand)}
                   border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}>
                   {brand.name}
               </Card>
           )}
       </Row>
    );
})

export default BrandBar;