import { Link, useNavigate } from "react-router-dom";
import { LOBBY_STATES } from '@networking/enums';
import { useNetwork } from "@app_contexts/networking";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SplashView = () => {

	const navigate = useNavigate();

	const { clientId } = useSelector( state => state.websocket );
	const { status, clients } = useSelector( ( state ) => state.lobby );

	const { peerEvents, broadcast } = useNetwork();

	useEffect( () => {
		peerEvents.attach( 'startGame', handleStartGame );
		return () => {
			peerEvents.detach( 'startGame', handleStartGame );
		}
	}, [ peerEvents ] );

	const startGame = () => {
		console.log( "Start Game" );
		broadcast( JSON.stringify( {
			type : "startGame"
		} ) );
		
		handleStartGame();
	}

	const handleStartGame = () => {
		navigate( "/gameplay" );
	}

	return(
		<div className='d-flex flex-column align-items-center justify-content-center' style={ { width : '100vw', height : '100vh' } }>
			<h1>:D</h1>
			{
				status === LOBBY_STATES[ 3 ] || clients.findIndex( c => c.id === clientId ) === 0 ?
				<button className="btn btn-primary" role="button" onClick={ startGame }>Start Game</button> :
				<span>Waiting for host...</span>
			}
		</div>
	)
}

export default SplashView;