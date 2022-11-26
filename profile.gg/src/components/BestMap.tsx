import bind from '../assets/bind.png'
import '../styles/components.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function BestMap(props: any = {}){
    const { userData, mapName, isEdit, setIsEdit } = props;
    return(

        <div className='grid-component' onClick={() => {setIsEdit(true)}}>
            <img src={bind} className="best-map"></img>
            <div className="col">
                <h1>MELHOR MAPA</h1>
                <h2>{mapName}</h2>
            </div>
        </div>

    )
}

export default BestMap;
