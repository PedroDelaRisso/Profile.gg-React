import React, { useEffect, useState } from 'react';
import { Button,
    Row,
    Col,
    Container,
    Form,
    InputGroup,
} from 'react-bootstrap';
import bind from '../assets/bind.png'
import '../styles/components.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function BestMap(props: any = {}){
    const { userData, mapName } = props;
    return(
        <>
            <div className='grid-component'>
                <img src={bind} className="best-map"></img>
                <div className="col">
                    <h1>MELHOR MAPA</h1>
                    <h2>{mapName}</h2>
                </div>
            </div>
            <div className='grid-component'>
                <button onClick={()=>console.log(props.userData)}>usfhuashf</button>
            </div>
        </>
    )
}

export default BestMap;
