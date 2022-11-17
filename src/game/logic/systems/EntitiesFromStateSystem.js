import { addEntity, defineSystem, entityExists, getAllEntities, removeEntity } from "bitecs";
import { clean } from "@store/slices/entities";

import { instantiateArchetype } from "@game/logic/archetypes";

export default function EntitiesFromStateSystem( scene )
{
	const { dispatch } = scene;
	
	return defineSystem( ( world ) => {
		const { state } = scene;
		const { add, remove } = state.entities;

		// Add entities
		for( let i = 0; i < add.length; i++ )
		{
			const { eid } = add[i];
			let entity = eid !== undefined && eid.length > 0 ? parseInt( eid ) : addEntity( world );
			
			if( entityExists( world, entity ) )
			{
				instantiateArchetype( world, add[i], entity );
			}
		}

		// Remove entities
		for( let i = 0; i < remove.length; i++ )
		{
			let entity = parseInt( remove[i] );
			console.log(entityExists( world, entity ), "entityExists( world, entity )", getAllEntities( world ));
			if( entityExists( world, entity ) )
			{
				removeEntity( world, entity );
			}
		}

		dispatch( clean() );
	} )	
}