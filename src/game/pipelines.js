import { pipe } from "bitecs";
import DebugSystem from "@game/logic/systems/Debug";
import EntitiesFromStateSystem from "@game/logic/systems/EntitiesFromStateSystem";
import BlitterSystem from "@game/logic/systems/BlitterSystem";
import WebSocketSystem from "@game/logic/systems/WebSocketSystem";
import LobbySystem from "@game/logic/systems/LobbySystem";

export default function createSystemPipelines( scene )
{
	return [
		pipe(
			WebSocketSystem( scene ),
			LobbySystem( scene ),
			EntitiesFromStateSystem( scene ),
			BlitterSystem( scene ),
			DebugSystem( scene )
		)
	]
}