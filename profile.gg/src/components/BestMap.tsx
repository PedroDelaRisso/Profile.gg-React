import "../styles/components.css";
import "bootstrap/dist/css/bootstrap.min.css";
import importAll from "../helpers/ImportAll";

function bestMapPath(mapName: string) {
  const images = importAll(require.context('../assets/maps', false, /\.(png|jpe?g|svg|webp)$/));
  return (images)[`${mapName.toLowerCase()}.webp`];
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
