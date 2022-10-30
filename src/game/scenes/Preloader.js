import { Scene } from 'phaser';
import { spritesheets } from '@assets';

export default class Preloader extends Scene
{
	constructor()
	{
		super( 'Preloader' );
	}

	preload()
	{
		console.log( '...preloading...' );
		for( const spriteSheet of spritesheets )
		{
			const { key, location, frameWidth, frameHeight } = spriteSheet;
			this.load.spritesheet( key, location, { frameWidth, frameHeight } );
		}
	}

	create()
	{
		this.scene.start( 'Game' );
	}
}