import { createWorld, getAllEntities, getEntityComponents } from "bitecs";
import { Scene } from "phaser";
import store from '@store';
import { peerEvents, broadcast } from "@networking";

import createSystemPipelines from "@game/pipelines";
import { instantiateArchetype } from "@game/logic/archetypes";

import { spritesheets } from "@assets";
import Player from "@game/logic/archetypes/Player";

import Transform from '@game/logic/components/Transform';

export default class Gameplay extends Scene
{
	constructor()
	{
		super('Gameplay');
	}

	preload()
	{
		for( const spriteSheet of spritesheets )
		{
			this.blitter = this.add.blitter( 0, 0, spriteSheet.key );
		}
	}

	create()
	{
		console.log('...creating game...');

		this.state = store.getState();
		this.dispatch = store.dispatch;

		this.graphics = this.add.graphics();

		this.world = createWorld();

		this.pipelines = createSystemPipelines( this );

		//Spawn player
		this.spawnPlayer();
	}

	update()
	{
		// Get updated Redux state
		this.state = store.getState();
		this.input.mousePointer.updateWorldPoint( this.cameras.main );

		for( let i = 0; i < this.pipelines.length; i++ )
		{
			this.pipelines[i]( this.world );
		}
	}

	spawnPlayer()
	{
		const player = instantiateArchetype( this.world, Player );
		Transform.x[ player ] = Math.random() * 600;
		Transform.y[ player ] = Math.random() * 600;
	}

}