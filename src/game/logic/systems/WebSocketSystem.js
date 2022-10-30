import { defineQuery, defineSystem, enterQuery, exitQuery, removeEntity } from "bitecs";
import Socket from "@game/logic/components/Socket";
import { setNetworkEntity, setReadyState, setClientId } from "@store/slices/networking/websocket";
import { recieveMessage, answerMessage, clearAnsweredMessages, clearMessages } from "@store/slices/networking/messages";
import { batch } from "react-redux";

export let socket;

export default function WebSocketSystem( scene )
{
	const { dispatch } = scene;

	const wsQuery = defineQuery( [ Socket ] )
	const wsEnterQuery = enterQuery( wsQuery );
	const wsExitQuery = exitQuery( wsQuery );

	return defineSystem( ( world ) => {
		
		dispatch( clearAnsweredMessages() );

		const { websocket, messages } = scene.state;
		const { endpoint } = websocket;
		
		// Enter entities
		let entities = wsEnterQuery( world );
		for( let entity of entities )
		{
			socket = new WebSocket( `ws://${endpoint}` );

			socket.addEventListener( 'open', ( event ) => {
				const { readyState } = event.target;
				batch( () => {
					dispatch( setReadyState( readyState ) );
					dispatch( setNetworkEntity( entity ) );
				} );
			} );

			socket.addEventListener( 'message', ( event ) => {
				const data = JSON.parse( event.data );
				dispatch( recieveMessage( data ) );
			} );

			const handleClose = ( event ) => {
				const { readyState } = event.target;
				batch( () => {
					dispatch( setReadyState( readyState ) );
					dispatch( setClientId( null ) );
					dispatch( clearMessages() );
				} );
				removeEntity( world, entity );
			}

			socket.addEventListener( 'close', handleClose );

			socket.addEventListener( 'error', handleClose );
		}

		// This is kinda dumb. Fix it later.
		entities = wsQuery( world );
		for( let entity of entities )
		{
			if( socket.readyState === 1 )
			{
				for( let i = 0; i < messages.length; i++ )
				{
					const { id, type, payload } = messages[ i ];
					let answered = true;

					switch( type )
					{
						case 'connection_established' :
							batch( () => {
								dispatch( setClientId( payload ) );
								dispatch( answerMessage( id ) );
							} );
							answered = true;
							break;
					}					
					
					if( answered )
						dispatch( answerMessage( id ) );
				}
			}
		}

		// Exit entities
		entities = wsExitQuery( world );
		for( let entity of entities )
		{
			socket.close();
			socket = null;
		}
	} );
}