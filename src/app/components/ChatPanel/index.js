import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNetwork } from "@app_contexts/networking";
import { useKeyPress } from "@utilities/hooks";
import { addMessage } from "@store/slices/networking/chat";

import '@styles/components/chatPanel.scss';

const ChatPanel = () => {

	const dispatch = useDispatch();

	const inputRef = useRef( null );
	const listRef = useRef( null );

	const { clientId } = useSelector( state => state.websocket );
	const { clients } = useSelector( ( state ) => state.lobby );
	const { messages } = useSelector( ( state ) => state.chat );
	const { peerEvents, broadcast } = useNetwork();

	const enterToggle = useKeyPress( "Enter" );
	const escToggle = useKeyPress( "Escape" );

	const [ active, setActive ] = useState( false );
	
	useEffect( () => {
		peerEvents.attach( 'chat', handleReceiveMessage )

		return () => {
			peerEvents.detach( 'chat', handleReceiveMessage )
		}
	}, [ clientId, clients, peerEvents ] );
	
	useEffect( () => {
		if( enterToggle && !active )
			toggleActive();
		else if( escToggle && active )
			toggleActive();
	}, [ enterToggle, escToggle ] );

	useEffect( () => {
		if( listRef.current )
			listRef.current.scrollTop = listRef.current.scrollHeight;
	}, [ messages ] );

	const handleSendMessage = ( _event ) => {
		_event.preventDefault();
		const message = inputRef.current.value;

		if( message.length === 0 )
			return;

		appendMessage( clientId, message );
		broadcast( JSON.stringify( {
			type : 'chat',
			payload : message 
		} ) );
		inputRef.current.value = "";
	}

	const handleReceiveMessage = ( data ) => {
		appendMessage( data.peerId, data.payload );
	}
	
	const appendMessage = ( clientId, text ) => {
		dispatch( addMessage( { clientId, text } ) )
		//scroll to bottom
	}

	const toggleActive = () => {
		setActive( active => { return !active } );
	}

	return(
		<div id="chat-panel" className={`p-3 ${ active ? 'active' : '' } `}>
			<div role="button" className="text-end" onClick={ toggleActive }>
				{ 
					active ?
					<span className="text-white material-symbols-outlined">close</span> :
					<span className="text-white material-symbols-outlined">chat</span>
				}
			</div>
			<div ref={ listRef } className={ `message-list mb-3 ${ active ? '' : 'disabled' }` }>
				{
					messages.map( ( message, index ) => {

						const userIndex = clients.findIndex( c => c.id === message.clientId );
						const userName = userIndex !== -1 ? `User ${userIndex}` : 'Unknown';

						return(
							<div key={ index } className={`mb-1`}>
								<div className="fw-lighter">
									[{userName}] says: &nbsp;
									{ message.text }
								</div>
							</div>
						);
					} )
				}
			</div>
			<form onSubmit={ handleSendMessage } className={ `${ active ? '' : 'disabled' }` }>
				<div className="input-group input-group-sm">
					<input ref={ inputRef } type="text" className="form-control flex-fill" />
					<button className="btn btn-primary d-flex" type="submit">
						<span className="material-symbols-outlined">send</span>
					</button>
				</div>
			</form>
		</div>
	);
}

export default ChatPanel;