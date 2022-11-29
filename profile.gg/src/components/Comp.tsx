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
import importAll from '../helpers/ImportAll';

const getPlayTime = (userData) => {
  let millisseconds: number = 0;
  let matches = userData;
  matches.forEach((m) => {
    millisseconds += m.metadata?.game_length as number;
  });
  let hoursPlayed = millisseconds / 1000 / 3600;
  const hoursPlayed_stringSplit = hoursPlayed.toString().split(".");
  const hours = Number.parseInt(hoursPlayed_stringSplit[0]);
  const minutes_withDecimals = (hoursPlayed - hours) * 60;
  const minutes = Number.parseInt(
    minutes_withDecimals.toString().split(".")[0]
  );
  const seconds = ((minutes_withDecimals - minutes) * 60)
    .toString()
    .split(".")[0];
  let hoursPlayed_Patched = `${hours} horas, ${minutes} minutos e ${seconds} segundos.`;

  const obj = {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
  return obj;
};

const getTotalKills = (matches, gameName) => {
  let totalKills = 0;
  matches.forEach((m) => {
    totalKills += m.players.all_players.filter((p) =>
      gameName.includes(p.name)
    )[0].stats.kills;
  });

  return totalKills;
};

const getHitData = (matches, gameName) => {
  const hitData = {
    headShots: 0,
    bodyShots: 0,
    legShots: 0,
    totalShots: 0,
  };

  const stats = matches.map((m) =>
    m.players.all_players
      .filter((p) => gameName.includes(p.name as string))
      .map((p) => {
        return p.stats;
      })
  );
  stats.forEach((s) => {
    hitData.headShots += s[0].headshots;
    hitData.bodyShots += s[0].bodyshots;
    hitData.legShots += s[0].legshots;
    hitData.totalShots += s[0].headshots + s[0].bodyshots + s[0].legshots;
  });

  return hitData;
};

const getWinRate = (matches, gameName) => {
  let matchesWon = 0;
  let winRate = 0;
  matches.forEach((m) => {
    const p = m.players.all_players.filter((p) =>
      gameName.includes(p.name as string)
    )[0];
    let whoWon = m.teams.blue.has_Won ? "Blue" : "Red";
    if (whoWon === p.team) {
      matchesWon++;
    }
    winRate = (matchesWon / matches.length) * 100;
  });

  return winRate;
};

const getBestMap = (matches, gameName) => {
  const winsPerMap = matches
    .filter((m) => m.metadata.mode === 'Competitive' || m.metadata.mode === 'Standard')
    .map((m) => m.players.all_players
      .filter((p) => gameName.includes(p.name))
      .map((t) => ({
        has_won: t.team === 'Red' ? m.teams.red.has_won : m.teams.blue.has_won,
        map: m.metadata.map,
      })))
    .flat(2);
  let bestMap: string = '';
  let maps: any = {};
  let maxNumber: number = 0;
  winsPerMap.forEach((m) => {
    if (isNaN((maps)[m.map])) {
      (maps)[m.map] = 0;
    }
    (maps)[m.map]++;
    if ((maps)[m.map] > maxNumber) {
      maxNumber = (maps)[m.map];
      bestMap = m.map;
    }
  });
  return bestMap;
}


const getPlayerRank = (matches, gameName) => {
  const player = (matches.filter((m) => m.metadata.mode === 'Competitive').map((m) => m.players?.all_players?.filter((p) => gameName.includes(p.name))[0])[0]);

  let playerRank = {
    image: "",
    name: ""
  }
  const images = importAll(require.context('../assets/rank_png', false, /\.(png|jpe?g|svg|webp)$/));
  if (player.currenttier_patched === 'Radiant') {
    playerRank.image = (images)['Radiant_Rank.png'];
  } else {
    const space_split = player.currenttier_patched.split(' ');

    const [rank, number] = space_split;

    playerRank.image = (images)[`${rank}_${number}_Rank.png`];
  }
  playerRank.name = (player.currenttier_patched as string).toUpperCase();

  return playerRank
}

const Comp = (props: any = {}) => {
  const { userData, userName } = props;

  const [isEdit, setIsEdit] = useState(true);
  const [selectedComp, setSelectedComp] = useState(<></>);
  const [selectedCompName, setSelectedCompName] = useState("Nada");

  const playtime = getPlayTime(userData);
  const totalKills = getTotalKills(userData, userName.split("#")[0]);
  const hitData = getHitData(userData, userName.split("#")[0]);
  const winratePerc = getWinRate(userData, userName);
  const playerRank = getPlayerRank(userData, userName);

  getBestMap(userData, userName);

  const kills = <Kills abatesTotais={totalKills} setIsEdit={setIsEdit}></Kills>;
  const gametime = (
    <GameTime
      horas={playtime.hours}
      minutos={playtime.minutes}
      setIsEdit={setIsEdit}
    ></GameTime>
  );
  const rank = (
    <Rank
      rank={playerRank.image}
      rankName={playerRank.name}
      setIsEdit={setIsEdit}
    ></Rank>
  );
  const winrate = (
    <WinRate winrate={winratePerc} setIsEdit={setIsEdit}></WinRate>
  );
  const bestmap = <BestMap mapName={getBestMap(userData, userName)} setIsEdit={setIsEdit}></BestMap>;
  const hitlocation = (
    <HitLocation
      head={Math.round((hitData.headShots / hitData.totalShots) * 100)}
      body={Math.round((hitData.bodyShots / hitData.totalShots) * 100)}
      leg={Math.round((hitData.legShots / hitData.totalShots) * 100)}
      setIsEdit={setIsEdit}
    ></HitLocation>
  );
  if (isEdit) {
    return (
      <div className="grid-component">
        <h1 className="m-2">{selectedCompName}</h1>
        <Dropdown className="m-1">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Change
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              href="#/action-1"
              onClick={() => {
                setSelectedComp(kills);
                setIsEdit(false);
                setSelectedCompName("Kills");
              }}
            >
              Kills
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-2"
              onClick={() => {
                setSelectedComp(gametime);
                setIsEdit(false);
                setSelectedCompName("GameTime");
              }}
            >
              GameTime
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-3"
              onClick={() => {
                setSelectedComp(rank);
                setIsEdit(false);
                setSelectedCompName("Rank");
              }}
            >
              Rank
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-4"
              onClick={() => {
                setSelectedComp(winrate);
                setIsEdit(false);
                setSelectedCompName("WinRate");
              }}
            >
              WinRate
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-5"
              onClick={() => {
                setSelectedComp(bestmap);
                setIsEdit(false);
                setSelectedCompName("BestMap");
              }}
            >
              BestMap
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-6"
              onClick={() => {
                setSelectedComp(hitlocation);
                setIsEdit(false);
                setSelectedCompName("HitLocation");
              }}
            >
              HitLocation
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-7"
              onClick={() => {
                setSelectedComp(<></>);
                setIsEdit(false);
                setSelectedCompName("NADA");
              }}
            >
              Nada
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          onClick={() => {
            setIsEdit(false);
          }}
        >
          Cancel
        </Button>
      </div>
    );
  } else {
    return selectedComp;
  }
};

export default Comp;
