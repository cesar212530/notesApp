import React from 'react'
import { Card,Container,Row,Col, Form,Button,Table } from 'react-bootstrap'
class createUser extends React.Component  {

    constructor(){
        super();
        this.state = {
            nombre: '',
            users: [],
            _id: ''
        };
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.getUsers();
    }

    getUsers(){
        fetch('/servicio/api_notes_app/users')
            .then(res => res.json())
            .then(data => {
                this.setState({users: data});
            })
            .catch(err => console.error(err));

    }

    editUser(id){
        fetch('/servicio/api_notes_app/users/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                nombre: data.nombre,
                _id: data._id
            })
        })
    }

    deleteUser(id){
        fetch('/servicio/api_notes_app/users/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.getUsers();
        })
        .catch(err => console.error(err));
    }

    addUser(e){
        if(this.state._id){
            fetch('/servicio/api_notes_app/users/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify({ 
                    nombre: this.state.nombre
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
              .then (res => res.json())
              .then(res => {
                console.log(res);  
                this.setState({ nombre: '', _id : ''});
                this.getUsers();
              })
        } else {
            fetch('/servicio/api_notes_app/users', {
                method: 'POST',
                body: JSON.stringify({
                    nombre: this.state.nombre
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
              .then (res => res.json())
              .then(res => {
                console.log(res);  
                this.setState({nombre: ''});
                this.getUsers();
              })
              .catch(err => console.error(err));
        }
        e.preventDefault();
    }

    handleChange(e){
       const { name, value } =  e.target;
       this.setState({
           [name]: value
       })
    }

    render(){
        return (
            <Container fluid>
                <Row className="justify-content-md-center m-3">
                    <Col xs={4}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Create a User</Card.Title>
                                <Form onSubmit={this.addUser}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre de Usuario</Form.Label>
                                        <Form.Control type="text" name="nombre" value={this.state.nombre} onChange={this.handleChange} placeholder="Username" />
                                    </Form.Group>
                                    <Button variant="primary" block type="submit">
                                        Send
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={8}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Usuario</th>
                                <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(user => {
                                       return (
                                        <tr key={user._id}>
                                            <td>{user.nombre}</td>
                                            <td>
                                                <Button variant="warning" type="submit" className="m-2" onClick={() => this.editUser(user._id)}>
                                                    Edit
                                                </Button>
                                                <Button variant="danger" type="submit" className="m-2" onClick={() => this.deleteUser(user._id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                       ) 
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default createUser
