import { batch } from "react-redux";
import { setStatus, setClientId } from "@store/slices/networking/websocket";
import { leaveLobby } from "@store/slices/networking/lobby";
import { SOCKET_STATES } from "./enums";
import { EventEmitter } from "@utilities";

// Google's WebRTC ice server configuration
export const ICE_SERVER_CONFIG = {
	iceServers: [
		{
			urls: "stun:stun.l.google.com:19302"
		},
		{
			urls: 'turn:numb.viagenie.ca',
			credential: 'muazkh',
			username: 'webrtc@live.com'
		},
	]
};

export var socket = null;
export var peerConnections = null;
export const peerEvents = new EventEmitter();

export const openSocket = ( _endpoint, _dispatch ) => {
	return new Promise( ( resolve, reject ) => {
		if( !socket )
		{
			console.log( "Opening socket..." );

			socket = new WebSocket( `ws://${_endpoint}` );

			_dispatch( setStatus( SOCKET_STATES[socket.readyState] ) );

			socket.addEventListener( 'open', () => {
				console.log( "Socket opened." );

				_dispatch( setStatus( SOCKET_STATES[socket.readyState] ) );

				peerConnections = new Map();

				resolve( socket );
			} );

			socket.addEventListener( 'message', ( event ) => {
				const { type, payload } = JSON.parse( event.data );

				switch( type )
				{
					case 'connection_established' :
						console.log( payload )
						_dispatch( setClientId( payload ) );
						break;
				}
			} );

			socket.addEventListener( 'close', () => {
				console.log( 'Socket Disconnected' );

				batch( () => {
					_dispatch( setStatus( SOCKET_STATES[socket.readyState] ) );
					_dispatch( setClientId( null ) );
					_dispatch( leaveLobby() );
				} );

				peerConnections = null;

				socket = null;
			} );
		}
	} );
}

export const closeSocket = () => {
	if( socket )
	{
		console.log( "Closing socket..." );
		socket.close();
	}
}

export const broadcast = ( message ) => {
	if( peerConnections && peerConnections.size > 0)
	{	
		for( let [ peerId, peer ] of peerConnections )
		{
			// console.log( 'sending message to', peer );
			peer.channel.send( message );
		}
	}
}