import { defineQuery, defineSystem, enterQuery, exitQuery, removeComponent } from "bitecs";
import Lobby from "@game/logic/components/Lobby";
import Socket from "@game/logic/components/Socket";
import { socket } from "@networking";
import { joinLobby, leaveLobby, addClient, removeClient } from "@store/slices/networking/lobby";
import PeerConnection from "@networking/PeerConnection";

let peerConnections;

export default function LobbySystem( scene )
{
	peerConnections = new Map();

	const { dispatch } = scene;

	const lobbyQuery = defineQuery( [ Socket, Lobby ] );
	const lobbyEnterQuery = enterQuery( lobbyQuery );
	const lobbyExitQuery = exitQuery( lobbyQuery );

	return defineSystem( ( world ) => {

		const { websocket, lobby } = scene.state;
		const { clientId } = websocket;
		const { key } = lobby;
		
		const handleMessage = ( event ) => {
			const { type, payload } = JSON.parse( event.data );
			
			console.log( 'LobbySystem: Received message', type, payload );

			switch( type )
			{
				case 'lobby_joined' :
					dispatch( joinLobby( payload ) );

					const { clients } = payload;
					console.log('join', peerConnections)
					for( let peer of clients )
					{
						if( !peerConnections.has( peer ) && peer !== clientId )
						{
							console.log( 'LobbySystem: Creating peer connection for', peer );
							peerConnections.set( peer, new PeerConnection( { socket, clientId, peerId : peer, dispatch } ) );
							peerConnections.get( peer ).createDataChannel( 'data' );
						}
					}
					break;
				
				case 'client_connected' :
					dispatch( addClient( payload ) );
					break;

				case 'client_disconnected' :
					dispatch( removeClient( payload ) );

					if( peerConnections.has( payload ) )
					{
						const peer = peerConnections.get( payload );
						peer.close();
						peerConnections.delete( payload );
					}
					break;

				// Signaling events
				case 'offer' :
					if( !peerConnections.has( payload.origin ) )
					{
						peerConnections.set( payload.origin, new PeerConnection( { socket, clientId, peerId : payload.origin, dispatch } ) )
										.get( payload.origin )
										.handleOffer( payload );
					}
					break;

				case 'answer' :
					if( peerConnections.has( payload.origin ) )
					{
						peerConnections.get( payload.origin ).handleAnswer( payload );
					}
					break;

				case 'ice-candidate' :
					if( peerConnections.has( payload.origin ) )
					{
						peerConnections.get( payload.origin ).handleIceCandidate( payload );
					}
					break;
			}
		}

		const handleClose = () => {
			dispatch( leaveLobby() );
			peerConnections = new Map();
		}

		let entities = lobbyEnterQuery( world );
		for( let entity of entities )
		{
			if( socket.readyState === 1 )
			{
				socket.send( JSON.stringify( { type : 'join_or_create_lobby', payload : key.toUpperCase() } ) )
				socket.addEventListener( 'message', handleMessage );
				socket.addEventListener( 'close', handleClose );
			}
			else
			{
				removeComponent( world, Lobby, entity );
			}
			// socket.readyState !== 1 ? removeComponent( world, Lobby, entity ) : socket.send( JSON.stringify( { type : 'join_or_create_lobby', payload : key.toUpperCase() } ) );
		}

		// entities = lobbyQuery( world );
		// for( let entity of entities )
		// {
		// 	if( socket.readyState === 1 )
		// 	{
		// 		for( let i = 0; i < messages.length; i++ )
		// 		{
		// 			if( messages[i].answered )
		// 				continue;

		// 			const { id, type, payload } = messages[ i ];
		// 			let answered = true;
					
		// 			switch( type )
		// 			{
		// 				case 'lobby_joined' :
		// 					dispatch( joinLobby( payload ) );
		// 					answered = true;
		// 					break;

		// 				case 'client_connected' :
		// 					dispatch( addClient( payload ) );
							
		// 					if( !peerConnections.has( payload ) )
		// 					{
		// 						peerConnections.set( payload, new PeerConnection( { socket, clientId, peerId : payload, dispatch } ) );
		// 						peerConnections.get( payload ).createDataChannel( 'data' );
		// 					}

		// 					answered = true;
		// 					break;

		// 				case 'client_disconnected' :
		// 					dispatch( removeClient( payload ) );
		// 					console.log( 'client disconnected', payload );
		// 					if( peerConnections.has( payload ) )
		// 					{
		// 						const peer = peerConnections.get( payload );
		// 						peer.close();
		// 						peerConnections.delete( payload );
		// 					}

		// 					answered = true;
		// 					break;

		// 				// Signaling events
		// 				case 'offer' :
		// 					console.log(peerConnections)
		// 					if( !peerConnections.has( payload.origin ) )
		// 					{
		// 						peerConnections.set( payload.origin, new PeerConnection( { socket, clientId, peerId : payload.origin, dispatch } ) )
		// 										.get( payload.origin )
		// 										.handleOffer( payload );
		// 					}

		// 					answered = true;
		// 					break;

		// 				case 'answer' :
		// 					if( peerConnections.has( payload.origin ) )
		// 					{
		// 						peerConnections.get( payload.origin ).handleAnswer( payload );
		// 					}

		// 					answered = true;
		// 					break;

		// 				case 'ice-candidate' :
		// 					if( peerConnections.has( payload.origin ) )
		// 					{
		// 						peerConnections.get( payload.origin ).handleIceCandidate( payload );
		// 					}

		// 					answered = true;
		// 					break;
		// 			}	
					
		// 			if( answered )
		// 				dispatch( answerMessage( id ) );
		// 		}
		// 	}
		// }

		entities = lobbyExitQuery( world );
		for( let entity of entities )
		{
			socket.removeEventListener( 'message', handleMessage );
			dispatch( leaveLobby() );
		}

		// let i = messages.length;
		// while( i-- )
		// {
		// 	const { type, payload } = messages[ i ];
		// 	let answered = false;
			
		// 	console.log( 'lobby event', type, payload );

		// 	switch( type )
		// 	{
		// 		case 'lobby_joined' :
		// 			dispatch( joinLobby( payload ) );
		// 			answered = true;
		// 			break;

		// 		case 'client_connected' :
		// 			dispatch( addClient( payload ) );
					
		// 			if( !peerConnections.has( payload ) )
		// 			{
		// 				peerConnections.set( payload, new PeerConnection( { socket, clientId, peerId : payload, dispatch } ) );
		// 				peerConnections.get( payload ).createDataChannel( 'data' );
		// 			}

		// 			answered = true;
		// 			break;

		// 		case 'client_disconnected' :
		// 			dispatch( removeClient( payload ) );
		// 			console.log( 'client disconnected', payload );
		// 			if( peerConnections.has( payload ) )
		// 			{
		// 				const peer = peerConnections.get( payload );
		// 				peer.close();
		// 				peerConnections.delete( payload );
		// 			}

		// 			answered = true;
		// 			break;

		// 		// Signaling events
		// 		case 'offer' :
		// 			console.log(peerConnections)
		// 			if( !peerConnections.has( payload.origin ) )
		// 			{
		// 				peerConnections.set( payload.origin, new PeerConnection( { socket, clientId, peerId : payload.origin, dispatch } ) )
		// 								.get( payload.origin )
		// 								.handleOffer( payload );
		// 			}

		// 			answered = true;
		// 			break;

		// 		case 'answer' :
		// 			if( peerConnections.has( payload.origin ) )
		// 			{
		// 				peerConnections.get( payload.origin ).handleAnswer( payload );
		// 			}

		// 			answered = true;
		// 			break;

		// 		case 'ice-candidate' :
		// 			if( peerConnections.has( payload.origin ) )
		// 			{
		// 				peerConnections.get( payload.origin ).handleIceCandidate( payload );
		// 			}

		// 			answered = true;
		// 			break;
		// 	}

		// 	if( answered )
		// 		messages.splice( i, 1 );
		// }

		// for( let peer of peerConnections.values() )
		// {
		// 	if( peer.channel !== undefined && peer.channel.readyState === 'open' )
		// 	{
		// 		peer.channel.send( JSON.stringify( { msg : `Ping from ${clientId}` } ) );
		// 	}
		// }

	} );
}