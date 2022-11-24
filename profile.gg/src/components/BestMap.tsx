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

function BestMap(props:any){
    const {userData}=props;
    return(
        <div>
            <button onClick={()=>console.log(props.userData)}>usfhuashf</button>
        </div>
    )
}

export default BestMap;
