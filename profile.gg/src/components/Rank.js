import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css'
import teste from '../assets/rank_png/Radiant_Rank.png'



const Rank = (props) => {
    const { rank, rankName, isEdit, setIsEdit } = props
    
    return(
        <div className='grid-component' onClick={() => {setIsEdit(true)}}>
            <img src={rank}></img>
            <div className="col">
                <h1>{rankName}</h1>
            </div>
        </div>
    );
}

export default Rank;
