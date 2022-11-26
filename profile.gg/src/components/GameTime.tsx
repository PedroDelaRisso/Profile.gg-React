import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css'
import clock from '../assets/clock.png'

const GameTime = (props) => {
    const { horas, minutos, isEdit, setIsEdit } = props
    return(
        <div className='grid-component' onClick={() => {setIsEdit(true)}}>
            <img src={clock}></img>
            <div className="col">
                <h1>TEMPO DE JOGO</h1>
                <h2>{horas} HORAS e {minutos} MINUTOS</h2>
            </div>
        </div>
    );
}

export default GameTime;
