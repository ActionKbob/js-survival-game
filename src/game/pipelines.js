import { pipe } from "bitecs";
import DebugSystem from "@game/logic/systems/Debug";
import EntitiesFromStateSystem from "@game/logic/systems/EntitiesFromStateSystem";
import BlitterSystem from "@game/logic/systems/BlitterSystem";
import NetworkSystem from "@game/logic/systems/NetworkSystem";

export default function createSystemPipelines( scene )
{
	return [
		pipe(
			EntitiesFromStateSystem( scene ),
			BlitterSystem( scene ),
			DebugSystem( scene ),

			NetworkSystem( scene )
		)
	]
}