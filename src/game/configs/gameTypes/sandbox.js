import InfoPanel from "@components/debug/DebugWindow/panels/info";
import EntityEditorPanel from "@components/debug/DebugWindow/panels/entityEditor";
import NetworkingPanel from "@components/debug/DebugWindow/panels/networking";

import archetypeMap from '@game/logic/archetypes';

export const sandboxConfig = {
	name : "Sandbox",
	description : "A sandbox game for testing and development.",
	initialEntities : [
		archetypeMap.TestBlitter
	],
	debug : {
		enabled : true,
		openByDefault : true,
		minimizeByDefault : false,
		panels : [
			{
				name : "Info",
				openByDefault : true,
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
				openByDefault : false,
				Component : NetworkingPanel
			}
		]
	}
}