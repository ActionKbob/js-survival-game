import { addComponent, addEntity } from "bitecs";
import componentMap from "@game/logic/components";

export function instantiateArchetype( world, config, entity )
{
	entity = entity ? entity : addEntity( world );

	console.log( "instantiateArchetype", config, entity );
	for( const c of config.components )
	{
		const component = componentMap[ c.type ];
		addComponent( world, component, entity );
		if( c.props !== undefined && c.props.length > 0 )
		{
			for( const prop of c.props )
			{
				component[ prop.key ][ entity ] = prop.value;
			}
		}
	}

	return entity;
}

export let archetypeMap = {
	"TestBlitter" :
	{
		components : [
			{
				type : "Transform",
				props : [
					{
						key : "x",
						value : 200
					},
					{
						key : "y",
						value : 400
					}
				]
			},
			{
				type : "Blitter",
				props : [
					{
						key : "frame",
						value : 1
					}
				]
			}
		]
	}
}

export default archetypeMap;