import { ICE_SERVER_CONFIG } from ".";
import { EventEmitter } from "@utilities";

export default class PeerConnection
{
	constructor( { socket, clientId, peerId } )
	{
		this.socket = socket;
		this.clientId = clientId;
		this.peerId = peerId;

		this.remoteDesciptionSet = false;
		this.candidate = null;

		this.events = new EventEmitter();

		this.connection = new RTCPeerConnection( ICE_SERVER_CONFIG );
		this.connection.onicecandidate = this.onIceCandidate;
		this.connection.onnegotiationneeded = this.onNegotiationNeeded;

		console.log(`Attempting peer connection ${this.clientId} -> ${this.peerId}`);
	}

	createDataChannel = ( name ) => {
		console.log( `creating data channel ${name}` )
		this.handleDataChannelCreation( this.connection.createDataChannel( name ) );	
	}

	handleOffer = async ( { sdp } ) => {
		const peerDescription = new RTCSessionDescription( sdp );
		await this.connection.setRemoteDescription( peerDescription )
		.then( () => {
			return this.connection.createAnswer();
		} )
		.then( ( answer ) => {
			return this.connection.setLocalDescription( answer );
		} )
		.then( () => {
			this.socket.send( JSON.stringify({
				type : 'answer',
				payload : {
					target : this.peerId,
					origin : this.clientId,
					sdp : this.connection.localDescription
				}
			} ) );

			this.remoteDesciptionSet = true;
		} );
		
		this.connection.ondatachannel = ( e ) => this.handleDataChannelCreation( e.channel );
	}

	handleAnswer = ( { sdp } ) => {
		const peerDescription = new RTCSessionDescription( sdp );
		this.connection.setRemoteDescription( peerDescription )
		.then( () => {
			this.remoteDesciptionSet = true;
			if ( this.candidate !== null )
				return this.connection.addIceCandidate( this.candidate );
		} );
	}

	handleIceCandidate = async ( { candidate } ) => {
		// console.log(candidate, 'candidate');
		if( this.remoteDesciptionSet )
			await this.connection.addIceCandidate( new RTCIceCandidate( candidate ) ); //.catch( e => console.warn( 'handleIceCandidate error', e ) );
		else
			this.candidate = candidate;
	}
	
	handleDataChannelCreation = ( channel ) => {
		channel.onopen = () => {
			this.channel = channel;
			this.events.emit( 'open', { peerId : this.peerId } );

			console.log(`Channel Open: ${this.clientId} -> ${this.peerId}`);
		}

		channel.onmessage = ( e ) => {
			if( e.data instanceof ArrayBuffer )
			{
				this.events.emit( 'message', { type : 'gamestate_update', payload : e.data } );
			}
			else
			{
				const { type, payload } = JSON.parse( e.data );
				this.events.emit( 'message', { type, payload, peerId : this.peerId } );	
			}
		}

		channel.onclose = () => {
			this.events.emit( 'close', { peerId : this.peerId } );
			console.log(`Channel Close: ${this.clientId} -> ${this.peerId}`);
		}
	}

	onIceCandidate = ( event ) => {
		if( event.candidate )
		{
			this.socket.send( JSON.stringify( { 
				type : 'ice-candidate',
				payload : {
					target : this.peerId,
					origin : this.clientId,
					candidate : event.candidate
				} 
			} ) );
		}
	}

	onNegotiationNeeded = async ( event ) => {
		await this.connection.createOffer()
			.then( ( offer ) => {
				return this.connection.setLocalDescription( offer );
			} )
			.then( () => {
				this.socket.send( JSON.stringify( {
					type : 'offer',
					payload : {
						target : this.peerId,
						origin : this.clientId,
						sdp : this.connection.localDescription
					}
				} ) );
			} )
			.catch( e => console.warn( 'onnegotiationneeded', e ) );
	}

	close = () => {
		this.connection.close();
	}
}