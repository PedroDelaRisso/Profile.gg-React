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

const Comp = (props: any = {}) => {

    const [isEdit, setIsEdit] = useState(true);
    const [ selectedComp, setSelectedComp ] = useState(<></>)
    const [ selectedCompName, setSelectedCompName ] = useState("Nada")
    const kills = <Kills abatesTotais={45} setIsEdit={setIsEdit}></Kills>
    const gametime = <GameTime horas={13} minutos={45} setIsEdit={setIsEdit}></GameTime>
    const rank = <Rank rankName="IMORTAL 3" setIsEdit={setIsEdit}></Rank>
    const winrate = <WinRate winrate={51} setIsEdit={setIsEdit}></WinRate>
    const bestmap = <BestMap mapName={"BIND"} setIsEdit={setIsEdit}></BestMap>
    const hitlocation = <HitLocation head={21} body={55} leg={28} setIsEdit={setIsEdit}></HitLocation>
    if (isEdit) {
        return (
            <div className="grid-component" >
                <h1 className='m-2'>{selectedCompName}</h1>
                <Dropdown className='m-1'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Change
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={()=>{
                            setSelectedComp(kills)
                            setIsEdit(false)
                            setSelectedCompName("Kills")
                            }}>Kills</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={()=>{
                            setSelectedComp(gametime)
                            setIsEdit(false)
                            setSelectedCompName("GameTime")
                            }}>GameTime</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={()=>{
                            setSelectedComp(rank)
                            setIsEdit(false)
                            setSelectedCompName("Rank")
                            }}>Rank</Dropdown.Item>
                        <Dropdown.Item href="#/action-4" onClick={()=>{
                            setSelectedComp(winrate)
                            setIsEdit(false)
                            setSelectedCompName("WinRate")
                            }}>WinRate</Dropdown.Item>
                        <Dropdown.Item href="#/action-5" onClick={()=>{
                            setSelectedComp(bestmap)
                            setIsEdit(false)
                            setSelectedCompName("BestMap")
                            }}>BestMap</Dropdown.Item>
                        <Dropdown.Item href="#/action-6" onClick={()=>{
                            setSelectedComp(hitlocation)
                            setIsEdit(false)
                            setSelectedCompName("HitLocation")
                            }}>HitLocation</Dropdown.Item>
                        <Dropdown.Item href="#/action-7" onClick={()=>{
                            setSelectedComp(<></>)
                            setIsEdit(false)
                            setSelectedCompName("NADA")
                            }}>Nada</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button onClick={() => {setIsEdit(false)}}>Cancel</Button>
            </div>
        )

    } else {
        return (
            selectedComp
        )
    }
}

export default Comp;