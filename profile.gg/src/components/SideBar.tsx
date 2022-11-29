import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components.css';
import importAll from '../helpers/ImportAll';
import { Button } from 'react-bootstrap';

const getAgentPath = (agentName: string) => {
  const images = importAll(require.context('../assets/agents', false, /\.(png|jpe?g|svg|webp)$/));
  return (images)[`${agentName.toLowerCase()}.webp`];
}

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
  
    return obj;
  }

const SideBar = (props) => {
    const {playerName, userData, downloadHandle} = props
    const agent = getMostPlayedAgent(userData, playerName)

    return(
        <div className='side-bar' style={{flex:1}}>
        <div className='align-items-center vh-100 d-flex flex-column justify-content-around'>
            <span className='font-weight-bold h1'>{playerName.split('#')[0]}</span>
            <img src={getAgentPath(agent.agent)} className='char-img'></img>
            <span className='font-weight-bold h1' style={{'color':'#eee'}}>{agent.agent}</span>
            <Button variant="danger" onClick={downloadHandle}>Download</Button>
        </div>
    </div>
    );
}

export default SideBar;
