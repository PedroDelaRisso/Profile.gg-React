import { Container } from "react-bootstrap"
import '../styles/components.css'
import skull from "../assets/skull.png"


const Kills = (props) => {
    const { abatesTotais } = props
    return(
        <div className="grid-component">
            <img src={skull}></img>
            <div className="col">
                <h1>ABATES TOTAIS</h1>
                <h2>{abatesTotais} Kills</h2>
            </div>
        </div>
    )
}

export default Kills;
