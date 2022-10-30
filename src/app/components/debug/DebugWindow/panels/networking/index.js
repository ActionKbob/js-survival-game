import { useSelector } from "react-redux";
import Lobby from "./Lobby";
import WebSockets from "./WebSockets";

const NetworkingPanel = () => {

	const { readyState } = useSelector( ( state ) => state.websocket );

	return(
		<div id="networking-panel">
			<WebSockets />
			{
				readyState === 1 &&
				<Lobby />
			}
		</div>
	)
}

export default NetworkingPanel;