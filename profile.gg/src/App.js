import { useState, useRef  } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Kills from "./components/Kills";
import GameTime from "./components/GameTime";
import Rank from "./components/Rank";
import WinRate from "./components/WinRate";
import BestMap from "./components/BestMap";
import HitLocation from "./components/HitLocation";
import SideBar from "./components/SideBar";
import UserSearch from "./components/UserSearch";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Comp from "./components/Comp";


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



function App() {
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("LOUD Coreano#LLL"); // debug apenas, remover depois
  const printRef = useRef();

  const agent = getMostPlayedAgent(userData, username)

  console.log(JSON.stringify(agent));

  const handleDownloadImage = async (e) => {
    console.log("dsad",e.target.className);
    e.target.className += " d-none"
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }

    e.target.className = e.target.className.replace("d-none",'')
    console.log("Alo",e.target.className);
  };
  return (
    <>
      <Router>
        <div className="app" >
          <Routes>
            <Route path="/" element={
              <UserSearch username={username} setUsername={setUsername} setUserData={setUserData} />
            }>
            </Route>
            <Route path="/profile" element={
              <div className="vh-100 vw-100 d-flex flex-row bg-primary" id="background-profile" ref={printRef}>
                <SideBar playerName={username} agentImg={agent.agentImg} agentName={agent.agent} downloadHandle={handleDownloadImage}></SideBar>

                <div
                  className="vh-100 d-flex flex-column justify-content-around app"
                  style={{ flex: 3 }}
                >
                  <div
                    className="d-flex flex-row justify-content-around flex-wrap"
                    style={{ flex: 1 }}
                  >
                    <Comp userData={userData} userName={username}></Comp>
                    <Comp userData={userData} userName={username}></Comp>
                  </div>
                  <div
                    className="d-flex flex-row justify-content-around flex-wrap"
                    style={{ flex: 1 }}
                  >
                    <Comp userData={userData} userName={username}></Comp>
                    <Comp userData={userData} userName={username}></Comp>
                  </div>
                  <div
                    className="d-flex flex-row justify-content-around flex-wrap"
                    style={{ flex: 1 }}
                  >
                    <Comp userData={userData} userName={username}></Comp>
                    <Comp userData={userData} userName={username}></Comp>
                  </div>
                </div>
              </div>
            }>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
