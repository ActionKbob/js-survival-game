import { useEffect, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket, peerConnections, openSocket, closeSocket, broadcast, peerEvents } from "@networking";
import PeerConnection from '@networking/PeerConnection';
import { SOCKET_STATES } from "@networking/enums";
import { joinLobby, leaveLobby, addClient, removeClient, setClientStatus } from "@store/slices/networking/lobby";

export const NetworkContext = createContext();

export const NetworkProvider = ( { children } ) => {
	
	const dispatch = useDispatch();
	const { endpoint, status, clientId } = useSelector( state => state.websocket );
	// const { peers } = useSelector( state => state.peers );

	useEffect( () => {

		if( status === SOCKET_STATES[1] && clientId !== null )
		{
			socket.addEventListener( 'message', handleSocketMessage );
		}

	}, [ status, clientId ] );

	const connect = () => {
		openSocket( endpoint, dispatch );
	}

	const disconnect = () => {
		closeSocket();
	}

	const handleSocketMessage = ( event ) => {
		const { type, payload } = JSON.parse( event.data );
				
		switch( type )
		{	
			case 'lobby_joined' :
				dispatch( joinLobby( payload ) );

				const { clients } = payload;
				
				for( let peerId of clients )
				{
					if( peerId === clientId )
						continue;
					
					const peer = new PeerConnection( { socket, clientId, peerId } );
					peerConnections.set( peerId, peer );

					attachPeer( peer );
				
					peer.createDataChannel( 'data' );
				}
				
				break;

			case 'lobby_left' :
				dispatch( leaveLobby() );
				break;
			
			// Client Events
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
					const peer = new PeerConnection( { socket, clientId, peerId : payload.origin } );
					peerConnections.set( payload.origin, peer );

					attachPeer( peer );

					peer.handleOffer( payload );
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

	const attachPeer = ( peer ) =>  {
		peer.events.attach( 'open', handlePeerOpen );
		peer.events.attach( 'message', handlePeerMessage );
		peer.events.attach( 'close', handlePeerClose );
	}

	const handlePeerOpen = ( { peerId } ) => {
		dispatch( setClientStatus( { clientId : peerId, status : 1 } ) );
	}

	const handlePeerMessage = ( data ) => {

		if( data instanceof Object )
		{
			const { type, payload, peerId } = data;
			
			switch( type )
			{
				default :
				peerEvents.emit( type, { payload, peerId } );
				break;
			}
		}
	}

	const handlePeerClose = ( { peerId } ) => {
		dispatch( setClientStatus( { clientId : peerId, status : 3 } ) );
	}

	return(
		<NetworkContext.Provider value={ {
			peerEvents,

			connect,
			disconnect,
			broadcast
		} }>
			{ children }
		</NetworkContext.Provider>
	)
}

export const useNetwork = () => useContext( NetworkContext );