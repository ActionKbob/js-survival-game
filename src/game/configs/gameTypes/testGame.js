import InfoPanel from "@components/debug/DebugWindow/panels/info";
import EntityEditorPanel from "@components/debug/DebugWindow/panels/entityEditor";
import archetypeMap from "../../logic/archetypes";

export const testGame = {
	name : "Test Game",
	description : "A test game that initializes the entities needed to start a game.",
	initialEntities : [
		archetypeMap.TestBlitter
	],
	debug : {
		enabled : true,
		openByDefault : true,
		minimizedByDefault : true,
		panels : [
			{
				name : "Info",
				openByDefault : true,
				minimizable : true,
				Component : InfoPanel,
			},
			{
				name : "Entity Editor",
				openByDefault : false,
				Component : EntityEditorPanel
			}
		]
	}
}