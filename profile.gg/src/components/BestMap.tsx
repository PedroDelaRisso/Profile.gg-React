import ascent from "../assets/maps/ascent.webp";
import bind from "../assets/maps/bind.webp";
import breeze from "../assets/maps/breeze.webp";
import fracture from "../assets/maps/fracture.webp";
import haven from "../assets/maps/haven.webp";
import icebox from "../assets/maps/icebox.webp";
import pearl from "../assets/maps/pearl.webp";
import split from "../assets/maps/split.webp";
import "../styles/components.css";
import "bootstrap/dist/css/bootstrap.min.css";

function bestMapPath(mapName: string) {
  const mapUpperCase = mapName.toUpperCase();
  switch (mapUpperCase) {
    case "ASCENT":
      return ascent;
    case "BIND":
      return bind;
    case "BREEZE":
      return breeze;
    case "FRACTURE":
      return fracture;
    case "HAVEN":
      return haven;
    case "ICEBOX":
      return icebox;
    case "PEARL":
      return pearl;
    case "SPLIT":
      return split;
    default:
      return bind;
  }
}

function BestMap(props: any = {}) {
  const { userData, mapName, isEdit, setIsEdit } = props;
  return (
    <div
      className="grid-component"
      onClick={() => {
        setIsEdit(true);
      }}
    >
      <img src={bestMapPath(mapName)} className="best-map"></img>
      <div className="col">
        <h1>MELHOR MAPA</h1>
        <h2>{mapName}</h2>
      </div>
    </div>
  );
}

export default BestMap;
