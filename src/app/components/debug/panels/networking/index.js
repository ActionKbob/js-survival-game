import WebSocketPanel from "./WebSocket";
import LobbyPanel from "./Lobby";

const NetworkingPanel = () => {
	return(
		<div id="networking-panel">
			<WebSocketPanel />
			<LobbyPanel />
		</div>
	);
}

export default NetworkingPanel;