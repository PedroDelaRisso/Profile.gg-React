import React, { useEffect, useState } from 'react';
import { Button,
    Row,
    Col,
    Container,
    Form,
    InputGroup,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

async function getUserInfo(username: string, setLoading: Function, setLabelBotao: Function) {
    if (username.length > 0 && username.includes('#')) {
        const name = username.split('#')[0];
        const tag = username.split('#')[1];
        /* PARTE DA BUSCA DE JOGADOR */
    } else {
        console.log('Digita um trem válido por favor :/');
    }
}

function UserSearch() {
    const [username, setUsername] = useState('LOUD Coreano#LLL'); // debug apenas, remover username depois
    const [loading, setLoading] = useState(false);
    const [labelBotao, setLabelBotao] = useState('Generate');
    return (
        <>
            <Container>
                <Row className="justify-content-center mt-4">
                    <Col md={5}>
                        <InputGroup className="mb-3" size="lg">
                        <InputGroup.Text id="username-input">@</InputGroup.Text>
                        <Form.Control
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Username#TAG"
                            aria-label="Username"
                            aria-describedby="username-input"
                            onKeyUp={({key}) => {
                            if (key === 'Enter') {
                                getUserInfo(username, setLoading, setLabelBotao);
                            }
                            }}
                        />
                        <Button
                            style={{'width': '150px'}}
                            variant="success"
                            onClick={() => {
                                getUserInfo(username, setLoading, setLabelBotao);
                            }}
                            disabled={loading}
                        >
                            {labelBotao}
                        </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserSearch;