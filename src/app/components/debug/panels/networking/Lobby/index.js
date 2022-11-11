import { socket } from "@networking";
import { useDispatch, useSelector } from "react-redux";
import { setKey } from "@store/slices/networking/lobby";
import { LOBBY_STATES } from "@networking/enums";

const LobbyPanel = () => {

	const dispatch = useDispatch();

	const { clientId, status } = useSelector( state => state.websocket );
	const { key, status : lobbyStatus, clients } = useSelector( state => state.lobby );
	
	const handleLobbyKeyChange = ( _event ) => {
		dispatch( setKey( _event.target.value.toUpperCase() ) );
	}

	const handleJoinOrCreateLobby = () => {
		socket.send( JSON.stringify( { type : 'join_or_create_lobby', payload : key ? key.toUpperCase() : '' } ) );
	}

	const handleLeaveLobby = () => {
		socket.send( JSON.stringify( { type : 'leave_lobby' } ) );
	}

	return(
		<div className="lobby-panel">
			{
				status === 'connected' &&
				<div className="card">
					<div className="input-group input-group-sm">
						{
							lobbyStatus === LOBBY_STATES[3] ?
							<>
								<input type="text" className="form-control" value={ key } onChange={ handleLobbyKeyChange } placeholder="Enter Lobby Key..." maxLength={4} />
								<button className="d-flex btn btn-outline-light" onClick={ handleJoinOrCreateLobby }>
									{
										key === '' ?
										<>Create</> : 
										<>Join</>
									}
								</button>
							</> :
							<>
								<span className="input-group-text">Key</span>
								<span className="input-group-text flex-fill text-muted">{ key }</span>
								<button className="d-flex btn btn-danger" onClick={ handleLeaveLobby }>
									<span className="material-symbols-outlined">logout</span>
								</button>
							</>
						}
					</div>
					{
						lobbyStatus === LOBBY_STATES[1] &&
						<div className="mt-3">
							<span className="mb-2">Clients:</span>
							<ul className="list-group">
								{
									clients.map( ( client, index ) => {

										if( client !== clientId )
										{
											return(
												<li className="d-flex justify-content-between align-items-center" key={ index }>
													<span>{ client }</span>
													<span className="text-warning p-2 border">Waiting</span>
												</li>
											) ;
										}
									} )
								}
							</ul>
						</div>
					}
				</div>
			}
		</div>
	);
}

export default LobbyPanel;