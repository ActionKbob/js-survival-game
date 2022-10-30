import { defineSystem, getAllEntities } from "bitecs";
import { setMousePosition } from "@store/slices/debug";
import { setEntityCount } from "@store/slices/debug";
import { setFPS } from "@store/slices/debug";

export default function DebugSystem( scene )
{
	const { dispatch } = scene;

	return defineSystem( ( world ) => {

		const fps = scene.game.loop.actualFps; // TODO add this to world time object
		const { entityCount, mousePosition } = scene.state.debug;
		const { mousePointer } = scene.input;

		const { x, y, worldX, worldY } = mousePointer;

		dispatch( setFPS( fps ) );

		if( entityCount !== getAllEntities( world ).length )
			dispatch( setEntityCount( getAllEntities( world ).length ) );
		
		if( mousePosition.x !== x || mousePosition.y !== y || mousePosition.worldX !== worldX || mousePosition.worldY !== worldY )
			dispatch( setMousePosition( { x, y, worldX, worldY } ) );
	} );
}