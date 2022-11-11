import WebSocketPanel from "./WebSocket";
import LobbyPanel from "./Lobby";
import MessagingPanel from "./Messaging";

const NetworkingPanel = () => {
	return(
		<div id="networking-panel">
			<WebSocketPanel />
			<LobbyPanel />
			<MessagingPanel />
		</div>
	);
}

export default NetworkingPanel;