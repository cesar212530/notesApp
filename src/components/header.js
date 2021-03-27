import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const header = () => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand>NotesApp</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/notes">
                        <Nav.Link>Notes</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/createNote">
                        <Nav.Link>Create Note</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/createUser">
                        <Nav.Link>Create User</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
</Navbar>
    )
}

export default header
