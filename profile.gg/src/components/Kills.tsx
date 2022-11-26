import { Container } from "react-bootstrap"
import '../styles/components.css'
import skull from "../assets/skull.png"
import Comp from '../components/Comp';


const Kills = (props: any = {}) => {
    const { abatesTotais, isEdit, setIsEdit } = props
    return(
        <div className="grid-component" onClick={() => {setIsEdit(true)}}>
            <img src={skull}></img>
            <div className="col">
                <h1>ABATES TOTAIS</h1>
                <h2>{abatesTotais} Kills</h2>
            </div>
        </div>
    )
}

export default Kills;
