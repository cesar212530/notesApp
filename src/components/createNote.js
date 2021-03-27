import React from 'react'
import { Card,Container,Row,Col, Form,Button,Table } from 'react-bootstrap'
class createNote extends React.Component  {

    constructor(){
        super();
        this.state = {
            titulo: '',
            content: '',
            usuario: '',
            fecha: '',
            notes: [],
            users: [],
            _id: ''
        };
        this.addNote = this.addNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.getNotes();
        this.getUsers();
    }

    getNotes(){
        fetch('/servicio/api_notes_app/notes')
            .then(res => res.json())
            .then(data => {
                this.setState({notes: data});
            })
            .catch(err => console.error(err));

    }

    getUsers(){
        fetch('/servicio/api_notes_app/users')
            .then(res => res.json())
            .then(data => {
                this.setState({users: data});
            })
            .catch(err => console.error(err));

    }

    editNote(id){
        fetch('/servicio/api_notes_app/notes/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                titulo: data.titulo,
                usuario: data.usuario,
                fecha: data.fecha,
                content: data.content,
                _id: data._id
            })
        })
    }

    deleteNote(id){
        fetch('/servicio/api_notes_app/notes/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.getNotes();
        })
        .catch(err => console.error(err));
    }

    addNote(e){
        if(this.state._id){
            fetch('/servicio/api_notes_app/notes/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
              .then (res => res.json())
              .then(res => {
                console.log(res);  
                this.setState({titulo: '', usuario: '', content: '', fecha: '', _id : ''});
                this.getNotes();
              })
        } else {
            fetch('/servicio/api_notes_app/notes', {
                method: 'POST',
                body: JSON.stringify({
                    titulo: this.state.titulo,
                    usuario: this.state.usuario,
                    content: this.state.content,
                    fecha: this.state.fecha
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
              .then (res => res.json())
              .then(res => {
                console.log(res);  
                this.setState({titulo: '', usuario: '', content: '', fecha: ''});
                this.getNotes();
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
                                <Card.Title>Create a Note</Card.Title>
                                <Form onSubmit={this.addNote}>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Select User</Form.Label>
                                        <Form.Control as="select" name="usuario" value={this.state.usuario} onChange={this.handleChange}>
                                            {
                                                this.state.users.map(user => {
                                                    return (
                                                        <option key={user._id}>{user.nombre}</option>
                                                    )
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" name="titulo" value={this.state.titulo} onChange={this.handleChange} placeholder="Title" />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control as="textarea" name="content" value={this.state.content} onChange={this.handleChange} rows={3} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Fecha</Form.Label>
                                        <Form.Control type="date" name="fecha" value={this.state.fecha} onChange={this.handleChange} placeholder="Title" />
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
                                <th>Title</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Content</th>
                                <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.notes.map(note => {
                                       return (
                                        <tr key={note._id}>
                                            <td>{note.titulo}</td>
                                            <td>{note.usuario}</td>
                                            <td>{note.fecha}</td>
                                            <td>{note.content}</td>
                                            <td>
                                                <Button variant="warning" type="submit" className="m-2" onClick={() => this.editNote(note._id)}>
                                                    Edit
                                                </Button>
                                                <Button variant="danger" type="submit" className="m-2" onClick={() => this.deleteNote(note._id)}>
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

export default createNote
