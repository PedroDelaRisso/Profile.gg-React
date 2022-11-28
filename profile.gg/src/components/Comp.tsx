import '../styles/components.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Kills from './Kills';
import GameTime from './GameTime';
import Rank from './Rank';
import BestMap from './BestMap';
import HitLocation from './HitLocation'
import WinRate from './WinRate';



const getPlayTime = (userData) => {
    let millisseconds: number = 0;
    let matches = userData
    matches.forEach((m) => {
        millisseconds += m.metadata?.game_length as number;
    });
    let hoursPlayed = (millisseconds / 1000) / 3600;
    const hoursPlayed_stringSplit = hoursPlayed.toString().split('.');
    const hours = Number.parseInt(hoursPlayed_stringSplit[0]);
    const minutes_withDecimals = (hoursPlayed - hours) * 60;
    const minutes = Number.parseInt(minutes_withDecimals.toString().split('.')[0]);
    const seconds = ((minutes_withDecimals - minutes) * 60).toString().split('.')[0];
    let hoursPlayed_Patched = `${hours} horas, ${minutes} minutos e ${seconds} segundos.`

    const obj = {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
    return obj;
}


const getTotalKills = (matches, gameName) => {
    let totalKills = 0;
    console.log(gameName)
    matches.forEach((m) => {
        totalKills += m.players.all_players.filter((p) => gameName.includes(p.name))[0].stats.kills;
    })
    console.log('Total Kills',totalKills);
    
    return totalKills
}


const getHitData = (matches, gameName) => {

    const hitData = {
        headShots:0,
        bodyShots:0,
        legShots:0,
        totalShots:0
    }

    const stats = (matches.map((m) => m.players.all_players.filter((p) => gameName.includes(p.name as string)).map((p) => {
      return p.stats;
    })));
    stats.forEach((s) => {
      hitData.headShots += s[0].headshots;
      hitData.bodyShots += s[0].bodyshots;
      hitData.legShots += s[0].legshots;
      hitData.totalShots += (s[0].headshots + s[0].bodyshots + s[0].legshots);
    })
    console.log(JSON.stringify(hitData));
    
    return hitData;
  }

const getWinRate = (matches, gameName) => {
    let matchesWon = 0;
    let winRate = 0;
    matches.forEach((m) => {
      const p = m.players.all_players.filter((p) => gameName.includes(p.name as string))[0];
      let whoWon = m.teams.blue.has_Won ? "Blue" : "Red";
      if (whoWon === p.team) {
        matchesWon++;
      }
      winRate = ((matchesWon / matches.length) * 100);
    })

    return winRate;
  }


  const getPlayerRank = (matches, gameName) => {
    const player = ( matches.filter((m) => m.metadata.mode === 'Competitive').map((m) => m.players?.all_players?.filter((p) =>  gameName.includes(p.name))[0])[0]);
    
    let playerRank = {
        image:"",
        name:""
    }
    if(player) {
      switch (player.currenttier_patched) {
        case 'Iron 1':
           playerRank.image = '../assets/rank_png/Iron_1_Rank.png'
           playerRank.name = 'Ferro 1'
          break;
        case 'Iron 2':
           playerRank.image = '../assets/rank_png/Iron_2_Rank.png'
           playerRank.name = 'Ferro 2'
          break;
        case 'Iron 3':
           playerRank.image = '../assets/rank_png/Iron_3_Rank.png'
           playerRank.name = 'Ferro 3'
          break;
        case 'Bronze 1':
           playerRank.image = '../assets/rank_png/Bronze_1_Rank.png'
           playerRank.name = 'Bronze 1'
          break;
        case 'Bronze 2':
           playerRank.image = '../assets/rank_png/Bronze_2_Rank.png'
           playerRank.name = 'Bronze 2'
          break;
        case 'Bronze 3':
           playerRank.image = '../assets/rank_png/Bronze_3_Rank.png'
           playerRank.name = 'Bronze 3'
          break;
        case 'Silver 1':
           playerRank.image = '../assets/rank_png/Silver_1_Rank.png'
           playerRank.name = 'Prata 1'
          break;
        case 'Silver 2':
           playerRank.image = '../assets/rank_png/Silver_2_Rank.png'
           playerRank.name = 'Prata 2'
          break;
        case 'Silver 3':
           playerRank.image = '../assets/rank_png/Silver_3_Rank.png'
           playerRank.name = 'Prata 3'
          break;
        case 'Gold 1':
           playerRank.image = '../assets/rank_png/Gold_1_Rank.png'
           playerRank.name = 'Ouro 1'
          break;
        case 'Gold 2':
           playerRank.image = '../assets/rank_png/Gold_2_Rank.png'
           playerRank.name = 'Ouro 2'
          break;
        case 'Gold 3':
           playerRank.image = '../assets/rank_png/Gold_3_Rank.png'
           playerRank.name = 'Ouro 3'
          break;
        case 'Platinum 1':
           playerRank.image = '../assets/rank_png/Platinum_1_Rank.png'
           playerRank.name = 'Platina 1'
          break;
        case 'Platinum 2':
           playerRank.image = '../assets/rank_png/Platinum_2_Rank.png'
           playerRank.name = 'Platina 2'
          break;
        case 'Platinum 3':
           playerRank.image = '../assets/rank_png/Platinum_3_Rank.png'
           playerRank.name = 'Platina 3'
          break;
        case 'Diamond 1':
           playerRank.image = '../assets/rank_png/Diamond_1_Rank.png'
           playerRank.name = 'Diamante 1'
          break;
        case 'Diamond 2':
           playerRank.image = '../assets/rank_png/Diamond_2_Rank.png'
           playerRank.name = 'Diamante 2'
          break;
        case 'Diamond 3':
           playerRank.image = '../assets/rank_png/Diamond_3_Rank.png'
           playerRank.name = 'Diamante 3'
          break;
        case 'Ascendant 1':
           playerRank.image = '../assets/rank_png/Ascendant_1_Rank.png'
           playerRank.name = 'Ascendente 1'
          break;
        case 'Ascendant 2':
           playerRank.image = '../assets/rank_png/Ascendant_2_Rank.png'
           playerRank.name = 'Ascendente 2'
          break;
        case 'Ascendant 3':
           playerRank.image = '../assets/rank_png/Ascendant_3_Rank.png'
           playerRank.name = 'Ascendente 3'
          break;
        case 'Immortal 1':
           playerRank.image = '../assets/rank_png/Immortal_1_Rank.png'
           playerRank.name = 'Imortal 1'
          break;
        case 'Immortal 2':
           playerRank.image = '../assets/rank_png/Immortal_2_Rank.png'
           playerRank.name = 'Imortal 2'
          break;
        case 'Immortal 3':
           playerRank.image = '../assets/rank_png/Immortal_3_Rank.png'
           playerRank.name = 'Imortal 3'
          break;
        case 'Radiant':
           playerRank.image = '../assets/rank_png/Radiant_Rank.png'
           playerRank.name = 'Radiante'
          break;
      }

      return playerRank
    }
  }

const Comp = (props: any = {}) => {
    const { userData, userName } = props;
    console.log(userData);

    const [isEdit, setIsEdit] = useState(true);
    const [selectedComp, setSelectedComp] = useState(<></>)
    const [selectedCompName, setSelectedCompName] = useState("Nada")



    const playtime = getPlayTime(userData)
    const totalKills = getTotalKills(userData,userName.split('#')[0])
    const hitData = getHitData(userData,userName.split('#')[0])
    const winratePerc = getWinRate(userData, userName)
    const playerRank = getPlayerRank(userData, userName)

    console.log(JSON.stringify(playerRank));
    

    const kills = <Kills abatesTotais={totalKills} setIsEdit={setIsEdit}></Kills>
    const gametime = <GameTime horas={playtime.hours} minutos={playtime.minutes} setIsEdit={setIsEdit}></GameTime>
    const rank = <Rank rank={playerRank?.image} rankName={playerRank?.name} setIsEdit={setIsEdit}></Rank>
    const winrate = <WinRate winrate={winratePerc} setIsEdit={setIsEdit}></WinRate>
    const bestmap = <BestMap mapName={"BIND"} setIsEdit={setIsEdit}></BestMap>
    const hitlocation = <HitLocation head={Math.round((hitData.headShots/hitData.totalShots)*100)} body={Math.round((hitData.bodyShots/hitData.totalShots)*100)} leg={Math.round((hitData.legShots/hitData.totalShots)*100)} setIsEdit={setIsEdit}></HitLocation>
    if (isEdit) {
        return (
            <div className="grid-component" >
                <h1 className='m-2'>{selectedCompName}</h1>
                <Dropdown className='m-1'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Change
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={() => {
                            setSelectedComp(kills)
                            setIsEdit(false)
                            setSelectedCompName("Kills")
                        }}>Kills</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={() => {
                            setSelectedComp(gametime)
                            setIsEdit(false)
                            setSelectedCompName("GameTime")
                        }}>GameTime</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => {
                            setSelectedComp(rank)
                            setIsEdit(false)
                            setSelectedCompName("Rank")
                        }}>Rank</Dropdown.Item>
                        <Dropdown.Item href="#/action-4" onClick={() => {
                            setSelectedComp(winrate)
                            setIsEdit(false)
                            setSelectedCompName("WinRate")
                        }}>WinRate</Dropdown.Item>
                        <Dropdown.Item href="#/action-5" onClick={() => {
                            setSelectedComp(bestmap)
                            setIsEdit(false)
                            setSelectedCompName("BestMap")
                        }}>BestMap</Dropdown.Item>
                        <Dropdown.Item href="#/action-6" onClick={() => {
                            setSelectedComp(hitlocation)
                            setIsEdit(false)
                            setSelectedCompName("HitLocation")
                        }}>HitLocation</Dropdown.Item>
                        <Dropdown.Item href="#/action-7" onClick={() => {
                            setSelectedComp(<></>)
                            setIsEdit(false)
                            setSelectedCompName("NADA")
                        }}>Nada</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button onClick={() => { setIsEdit(false) }}>Cancel</Button>
            </div>
        )

    } else {
        return (
            selectedComp
        )
    }
}

export default Comp;