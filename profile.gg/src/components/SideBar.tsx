import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css'
import raze from '../assets/raze.png'
import { Button } from 'react-bootstrap';

const SideBar = (props) => {
    const {playerName, downloadHandle} = props
    return(
        <div className='side-bar' style={{flex:1}}>
        <div className='align-items-center vh-100 d-flex flex-column justify-content-around'>
            <span className='font-weight-bold h1'>{playerName}</span>
            <img src={raze} className='char-img'></img>
            <span className='font-weight-bold h1'>RAZE</span>
            <Button variant="danger" onClick={downloadHandle}>Download</Button>
        </div>
    </div>
    );
}

export default SideBar;
