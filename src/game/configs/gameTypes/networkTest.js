import InfoPanel from "@components/debug/DebugWindow/panels/info";
import EntityEditorPanel from "@components/debug/DebugWindow/panels/entityEditor";
import NetworkingPanel from "@components/debug/DebugWindow/panels/networking";

import archetypeMap from '@game/logic/archetypes';

export const networkTestConfig = {
	name : "Network Test",
	description : "A mostly empty environment for testing network connections.",
	initialEntities : [
		// archetypeMap.TestBlitter,
		// {
		// 	components : [
		// 		{
		// 			type : "Socket"
		// 		}
		// 	]
		// }
	],
	debug : {
		enabled : true,
		openByDefault : true,
		minimizeByDefault : false,
		panels : [
			{
				name : "Info",
				openByDefault : false,
				minimizable : true,
				Component : InfoPanel,
			},
			{
				name : "Entity Editor",
				openByDefault : true,
				Component : EntityEditorPanel
			},
			{
				name : "Networking",
				openByDefault : true,
				Component : NetworkingPanel
			}
		]
	}
}