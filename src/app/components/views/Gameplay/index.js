import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKeyPress } from "@utilities/hooks";
import game_types from "@game/configs/gameTypes";
import DebugWindow from "@components/debug/DebugWindow";
import { addEntity } from "@store/slices/entities";

import PauseWindow from "./PauseWindow";
import PhaserWrapper from "./PhaserWrapper";

const GameplayView = () => {

	const dispatch = useDispatch();
	const { gameType } = useSelector( state => state.config );

	const pauseToggle = useKeyPress( 'Escape' );
	const [ paused, setPaused ] = useState( false );
	
	const { debug } = game_types[ gameType ];

	useEffect( () => {
		if( pauseToggle )
			setPaused( p => !p );
	}, [ pauseToggle ] );

	useEffect( () => {
		
		for( let i = 0; i < game_types[ gameType ].initialEntities.length; i++ )
		{
			console.log(game_types[ gameType ].initialEntities[i])
			dispatch( addEntity( game_types[ gameType ].initialEntities[i] ) );
		}

	}, [ game_types ] );

	return(
		<div>
			<PhaserWrapper />
			{
				paused &&
				<PauseWindow />
			}
			{ 
				debug.enabled && 
				<DebugWindow config={ debug } />
			}
		</div>
	);
}

export default GameplayView;