import Phaser, { Game } from 'phaser';

import '@styles/components/phaserGame.scss';
import { useEffect, useRef } from 'react';

const phaserConfig = {
	type : Phaser.AUTO,

	backgroundColor : "#385D80",

	pixelArt : true,

	scale : {
		mode : Phaser.Scale.FIT,
		autoCenter : Phaser.Scale.CENTER_BOTH,
		width  : window.innerWidth,
		height : window.innerHeight,
	},
	
	scene : [],
	parent : "phaser-game"
}

const GameplayView = () => {

	const game = useRef( null );

	useEffect( () => {
		
		game.current = new Game( phaserConfig );
			
		return () => {

			if( game.current !== undefined )
				game.current.destroy();

		}

	}, [] );

	return(
		<div>
			<div id="phaser-game">
				{/* // Game UI goes here */}
			</div>
		</div>
	);
}

export default GameplayView;