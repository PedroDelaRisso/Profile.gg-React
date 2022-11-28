import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css'
import { Button } from 'react-bootstrap';


const getMostPlayedAgent = (matches,gameName) => {
    const charactersPlayed = (matches.map((m) => m.players?.all_players?.filter((p) => gameName.includes(p.name)).map((p) => ({ character: p.character, assets: p.assets })))  ).flat();
    var agents = {};
    let max = '';
    let maxImage = '';
    var maxNumber = 0;
    charactersPlayed.forEach((c) => {
      if (isNaN((agents)[c.character])) {
        (agents)[c.character] = 0;
      }
      (agents)[c.character]++;
      if ((agents)[c.character] > maxNumber) {
        maxNumber = (agents)[c.character];
        max = c.character;
        maxImage = c.assets.agent.full;
      }
    });
  
    const obj ={
        agent: max,
        agentImg:maxImage
    }
  
    console.log(JSON.stringify(obj));
    
    return obj
  }

const SideBar = (props) => {
    const {playerName, userData, downloadHandle} = props
    const agent = getMostPlayedAgent(userData, playerName)

    return(
        <div className='side-bar' style={{flex:1}}>
        <div className='align-items-center vh-100 d-flex flex-column justify-content-around'>
            <span className='font-weight-bold h1'>{playerName}</span>
            <img src={agent.agentImg} className='char-img'></img>
            <span className='font-weight-bold h1'>{agent.agent}</span>
            <Button variant="danger" onClick={downloadHandle}>Download</Button>
        </div>
    </div>
    );
}

export default SideBar;
