import { useSelector } from "react-redux";

const InfoPanel = () => {

	const { fps, entityCount, mousePosition } = useSelector( state => state.debug );
	
	return(
		<div id="info-panel">
			<div className="card">
				FPS : { fps }
			</div>
			<div className="card">
				<div>Mouse (Screen) : { mousePosition.x }, { mousePosition.y }</div>
				<div>Mouse (World) : { mousePosition.worldX }, { mousePosition.worldY }</div>
			</div>
			<div className="card">
				<div>Entity Count : { entityCount }</div>
			</div>
		</div>
	)

}; 

export default InfoPanel;