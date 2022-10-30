import Blitter from "@game/logic/components/Blitter";
import Transform from "@game/logic/components/Transform";
import { defineQuery, defineSystem, enterQuery, exitQuery } from "bitecs";

export let blitterMap;

export default function BlitterSystem( scene )
{
	const { blitter } = scene;

	const blitterQuery = defineQuery( [ Blitter, Transform ] );
	const blitterEnterQuery = enterQuery( blitterQuery );
	const blitterExitQuery = exitQuery( blitterQuery );

	blitterMap = [];

	return defineSystem( ( world ) => {

		let entities = blitterEnterQuery( world );
		for( let i = 0; i < entities.length; i++ )
		{
			const entity = entities[i];

			const frame = Blitter.frame[ entity ];
			const x = Transform.x[ entity ] + Blitter.origin_x[ entity ];
			const y = Transform.y[ entity ] + Blitter.origin_y[ entity ];

			const sprite = blitter.create( x, y, frame );

			blitterMap[ entity ] = sprite;
		}

		entities = blitterQuery( world );
		for( let i = 0; i < entities.length; i++ )
		{
			const entity = entities[i];

			const sprite = blitterMap[ entity ];
			sprite.x = Transform.x[ entity ] + Blitter.origin_x[ entity ];
			sprite.y = Transform.y[ entity ] + Blitter.origin_y[ entity ];

			// Blitter is dirty, needs to update
			if( Blitter.dirty[ entity ] === 1 )
			{
				blitterMap[ entity ].setFrame( Blitter.frame[ entity ] );
				Blitter.dirty[ entity ] = 0;
			}
		}

		entities = blitterExitQuery( world );
		for( let i = 0; i < entities.length; i++ )
		{
			const entity = entities[i];
			console.log('destroying blitter entity', entity);
			blitterMap[ entity ].destroy();
			blitterMap[ entity ] = null;
		}

	} );
}