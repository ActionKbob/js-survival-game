import { createWorld } from "bitecs";
import { Scene } from "phaser";

import { spritesheets } from "@assets";

import store from '@store';
import createSystemPipelines from "@game/pipelines";

export default class Game extends Scene
{
	constructor()
	{
		super('Game');
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

		this.grapgics = this.add.graphics();

		this.world = createWorld();

		this.pipelines = createSystemPipelines( this );		
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

}