import InfoPanel from "@components/debug/DebugWindow/panels/info";
import EntityEditorPanel from "@components/debug/DebugWindow/panels/entityEditor";
import NetworkingPanel from "@components/debug/DebugWindow/panels/networking";

import archetypeMap from '@game/logic/archetypes';

export const game_configs = [
	{
		name : "Single Player",
		description : "A sandbox game for testing and development without networking.",
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
				}
			]
		}
	},
	{
		name : "Multiplayer",
		description : "A sandbox game for testing and development with networking capabilities.",
		initialEntities : [
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
					openByDefault : false,
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
]