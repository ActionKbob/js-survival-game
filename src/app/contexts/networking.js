import { useEffect, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket, peerConnections, openSocket, closeSocket } from "@networking";
import PeerConnection from '@networking/PeerConnection';
import { SOCKET_STATES } from "@networking/enums";
import { joinLobby, leaveLobby, addClient, removeClient } from "@store/slices/networking/lobby";

export const NetworkContext = createContext();

export const NetworkProvider = ( { children } ) => {
	
	const dispatch = useDispatch();
	const { endpoint, status, clientId } = useSelector( state => state.websocket );
	const { peers } = useSelector( state => state.peers );

	useEffect( () => {

		if( status === SOCKET_STATES[1] && clientId !== null )
		{
			socket.addEventListener( 'message', handleSocketMessage );
		}

	}, [ status, clientId ] );

	useEffect( () => {
		for( let i = 0; i < peers.length; i++ )
		{
			const peerId = peers[i];
			
			if( peerConnections.has( peerId ) )
			{
				const peer = peerConnections.get( peerId );
				console.log( peer.channel );
			}
		}
	}, [ peers ] );

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
					
					peerConnections.set( peerId, new PeerConnection( { socket, clientId, peerId, dispatch } ) );
					peerConnections.get( peerId ).createDataChannel( 'data' );
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

	const handlePeerMessage = ( event ) => {

	}

	return(
		<NetworkContext.Provider value={ {
			connect,
			disconnect
		} }>
			{ children }
		</NetworkContext.Provider>
	)
}

export const useNetwork = () => useContext( NetworkContext );