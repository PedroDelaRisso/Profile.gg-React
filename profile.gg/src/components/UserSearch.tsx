import React, { useEffect, useState } from 'react';
import ValorantAPI, { AccountFetchOptions, APIResponse } from 'unofficial-valorant-api';
import { Button,
    Row,
    Col,
    Container,
    Form,
    InputGroup,
} from 'react-bootstrap';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const api = new ValorantAPI();

async function getUserInfo(username: string, setLoading: Function, setLabelBotao: Function) {
    if (username.length > 0 && username.includes('#')) {
        const name = username.split('#')[0];
        const tag = username.split('#')[1];
        const accountFetchOptions: AccountFetchOptions = {
            name,
            tag,
        }
        console.log(accountFetchOptions);
        setLoading(true);
        setLabelBotao('...');
        api.getAccount(accountFetchOptions)
            .then((getAccountResponse) => {
                if (getAccountResponse.error) {
                    (getAccountResponse.error as any).forEach((error: any = {}) => {
                        console.log(error.message);
                        setLoading(false);
                        setLabelBotao('Generate');
                    });
                }
                if (getAccountResponse.data) {
                    api.getMatchesByPUUID({ puuid: (getAccountResponse.data as any).puuid, region: 'br', size: 10 })
                        .then((getMatchesResponse) => {
                            console.log(getMatchesResponse.data);
                            setLoading(false);
                            setLabelBotao('Generate');
                        });
                }
            });
    } else {
        console.log('Digita um trem válido por favor :/');
    }
}

function UserSearch() {
    const [username, setUsername] = useState('LOUD Coreano#LLL'); // debug apenas, remover depois
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