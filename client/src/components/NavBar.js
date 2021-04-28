import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink className="text-warning" href={SHOP_ROUTE}>Buy device</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button variant="outline-light text-black" onClick={()=> history.push(ADMIN_ROUTE)}>Admin</Button>
                        <h2>{user.email}</h2>
                        <Button variant="outline-light ml-4 text-black" onClick={()=> logOut()}>Logout</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant="outline-light text-black" onClick={()=> history.push(LOGIN_ROUTE)}>Login</Button>,
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;