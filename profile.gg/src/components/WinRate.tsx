import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css'
import trophy from '../assets/trophy.png'

const WinRate = (props: any = {}) => {
    const { winrate } = props
    return(
        <div className='grid-component'>
            <img src={trophy}></img>
            <div className="col">
                <h1>WINRATE:</h1>
                <h2>{winrate}%</h2>
            </div>
        </div>
    );
}

export default WinRate;
