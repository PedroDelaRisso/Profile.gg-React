import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css'
import trophy from '../assets/trophy.png'

const WinRate = (props) => {
    const { winrate , isEdit, setIsEdit} = props
    return(
        <div className='grid-component' onClick={() => {setIsEdit(true)}}>
            <img src={trophy}></img>
            <div className="col">
                <h1>WINRATE:</h1>
                <h2>{winrate}%</h2>
            </div>
        </div>
    );
}

export default WinRate;
