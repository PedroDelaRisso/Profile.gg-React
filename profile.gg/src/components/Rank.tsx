import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css'
import Immortal_3_Rank from '../assets/rank_png/Immortal_3_Rank.png'

const Rank = (props) => {
    const { rank, rankName } = props
    return(
        <div className='grid-component'>
            <img src={Immortal_3_Rank}></img>
            <div className="col">
                <h1>{rankName}</h1>
            </div>
        </div>
    );
}

export default Rank;
