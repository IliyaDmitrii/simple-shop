import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {registration,login} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 60}}
        >
            <Card style={{width: 600}} className="p-5 ">
                <h2 className="m-auto mb-5">{isLogin ? 'Autorizare' : 'Autentificare'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Indica email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-4"
                        placeholder="Indica parola..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-5 pl-3 pr-3 text-decoration-none">
                        {isLogin ?
                            <div className="mt-3">
                                Inregistreazate <NavLink to={REGISTRATION_ROUTE}>Creeaza Cont</NavLink>
                            </div>
                            :
                            <div className="mt-3">
                                Cont Existent?  <NavLink to={LOGIN_ROUTE}>Intra</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success w-50 pl-3"}
                            onClick={click}
                        >
                            {isLogin ? 'Intra' : 'Inregistreazate'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;