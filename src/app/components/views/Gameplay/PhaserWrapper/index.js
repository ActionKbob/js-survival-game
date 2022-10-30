import Phaser from "phaser";
import { useEffect } from "react";
import { useRef } from "react";

import '@styles/components/phaserGame.scss';
import Preloader from "@game/scenes/Preloader";
import Game from "@game/scenes/Game";

const PhaserWrapper = () => {

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
		
		scene : [ Preloader, Game ],
		parent : "phaser-game"
	}

	const game = useRef( null );

	useEffect( () => {
		game.current = new Phaser.Game( phaserConfig );
		
		return () => {
			if( game.current !== undefined )
				game.current.destroy( true );
		}
	}, [] );

	return(
		<div id="phaser-game"></div>
	);
}

export default PhaserWrapper;