import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css'
import bodyImg from '../assets/body.png'

const WinRate = (props: any = {}) => {
    const {head, body, leg, isEdit, setIsEdit} = props
    return(
        <div className='grid-component' onClick={() => {setIsEdit(true)}}>
            <img src={bodyImg} className="body-img"></img>
            <div className="col f-left">
                <h2 className='m-4'>Cabeça {head}%</h2>
                <h2 className='m-4'>Corpo {body}%</h2>
                <h2 className='m-4'>Pernas {leg}%</h2>
            </div>
        </div>
    );
}

export default WinRate;
