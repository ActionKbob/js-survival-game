import { addComponent, addEntity, defineSystem, entityExists, getAllEntities, hasComponent, removeEntity } from "bitecs";
import { clean } from "@store/slices/entities";

import componentMap from "../components";

export default function EntitiesFromStateSystem( scene )
{
	const { dispatch } = scene;
	
	return defineSystem( ( world ) => {
		const { state } = scene;
		const { add, remove } = state.entities;
		
		// Add entities
		for( let i = 0; i < add.length; i++ )
		{
			const { eid, components } = add[i];
			
			let entity = eid !== undefined ? parseInt( eid ) : '';
			
			if( entity === '' )
			{
				entity = addEntity( world );
			}

			if( entityExists( world, entity ) )
			{
				for( const c of components )
				{
					const Component = componentMap[ c.type ];
					if( !hasComponent( world, Component, entity ) )
						addComponent( world, Component, entity );
					
					if( c.props !== undefined && c.props.length > 0 )
					{
						for( const prop of c.props )
						{
							Component[ prop.key ][ entity ] = prop.value;
						}
					}
				}
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