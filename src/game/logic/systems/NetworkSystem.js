import { defineSystem, defineSerializer, Changed, defineQuery, pipe, DESERIALIZE_MODE, defineDeserializer } from "bitecs";
import Transform from '@game/logic/components/Transform';
import Blitter from '@game/logic/components/Blitter';
import Broadcast from "@game/logic/components/Broadcast";
import { broadcast } from "@networking";
import { peerEvents } from "../../../networking";

export default function NetworkSystem( scene )
{
	// const changedTransformsSerializer = defineSerializer( [ Blitter, Changed( Transform ) ] );
	const changedTransformsSerializer = defineSerializer( [ Blitter, Transform ] );
	const transformDeserializer = defineDeserializer( [ Blitter, Transform ] );
	const transformQuery = pipe( defineQuery( [ Blitter, Transform, Broadcast ] ), changedTransformsSerializer );

	const handleGameStateUpdate = ( data ) => {
		// console.log( "handleGameStateUpdate", data );
		const mode = DESERIALIZE_MODE.MAP
		const world = scene.world;
		// console.log('data', data)
		const deserializedLocalEntities = transformDeserializer( scene.world, data.payload, mode );
	}

	peerEvents.attach( 'gamestate_update', handleGameStateUpdate );

	return defineSystem( ( world ) => {
		
		const packet = transformQuery( world );
		if( packet !== undefined )
		{
			broadcast( packet );
		}

	} );
}