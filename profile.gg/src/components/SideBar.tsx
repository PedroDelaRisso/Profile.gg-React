import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css'
import raze from '../assets/raze.png'

const SideBar = (props: any = {}) => {
    const {playerName} = props
    return(
        <div className='side-bar' style={{flex:1}}>
        <div className='align-items-center d-flex flex-column justify-content-around'>
            
            <span className='font-weight-bold h1'>{playerName}</span>
            <img src={raze} className='char-img'></img>
            <span className='font-weight-bold h1'>RAZE</span>
        </div>
    </div>
    );
}

export default SideBar;
