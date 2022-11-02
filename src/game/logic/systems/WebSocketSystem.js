import { defineQuery, defineSystem, enterQuery, exitQuery, removeEntity } from "bitecs";
import Socket from "@game/logic/components/Socket";
import { connect, disconnect } from "@store/slices/networking/websocket";
import { openSocket } from '@networking';

let socket;

export default function WebSocketSystem( scene )
{
	const { dispatch } = scene;

	const wsQuery = defineQuery( [ Socket ] )
	const wsEnterQuery = enterQuery( wsQuery );
	const wsExitQuery = exitQuery( wsQuery );

	return defineSystem( ( world ) => {
		
		const { websocket } = scene.state;
		const { endpoint } = websocket;
		
		// Enter entities
		let entities = wsEnterQuery( world );
		for( let entity of entities )
		{
			// socket = new WebSocket( `ws://${endpoint}` );
			socket = openSocket( endpoint );

			const handleOpen = () => {
				console.log( 'Connected to server' );
			}

			const handleMessage = ( event ) => {
				const { type, payload } = JSON.parse( event.data );
				
				switch( type )
				{
					case 'connection_established' :
						dispatch( connect( { networkEID : entity, clientId : payload } ) );
						break;
				}	
			}

			const handleClose = ( event ) => {
				dispatch( disconnect() );
				removeEntity( world, entity );
				console.log( 'Disconnected from server' );
			}

			socket.addEventListener( 'open', handleOpen );
			socket.addEventListener( 'message', handleMessage );
			socket.addEventListener( 'close', handleClose );
			socket.addEventListener( 'error', handleClose );
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