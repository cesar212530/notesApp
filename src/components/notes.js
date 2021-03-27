import React from 'react'
import { Card,Container,Row,Col } from 'react-bootstrap'
class notes extends React.Component  {

    constructor(){
        super();
        this.state = {
            notes: [],
        };
    }

    componentDidMount(){
        this.getNotes();
    }

    getNotes(){
        fetch('/servicio/api_notes_app/notes')
            .then(res => res.json())
            .then(data => {
                this.setState({notes: data});
            })
            .catch(err => console.error(err));

    }

    render(){
        return (
            <Container fluid>
                <Row className="justify-content-md-center m-3">
                        {
                            this.state.notes.map(note =>{
                                return (
                                    <Col xs={4} key={note._id} className="m-3">
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Header>{note.titulo}</Card.Header>
                                            <Card.Body>
                                                <Card.Subtitle className="mb-2 text-muted">{note.usuario}</Card.Subtitle>
                                                <Card.Text>{note.content}</Card.Text>
                                                <Card.Text>{note.fecha}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                </Row>
            </Container>
        )
    }
}

export default notes
