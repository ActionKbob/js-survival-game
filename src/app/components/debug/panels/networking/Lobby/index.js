import { useDispatch, useSelector } from "react-redux";
import { useNetwork } from "@app_contexts/networking";
import { socket } from "@networking";
import { LOBBY_STATES } from "@networking/enums";
import { setKey } from "@store/slices/networking/lobby";

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
							<div>
								<div className="mb-2">Clients:</div>
								<ul className="list-group">
									{
										clients.map( ( client, index ) => {
											return(
												<li className="d-flex justify-content-between align-items-center mb-1" key={ index }>
													<span>
														{ client.id }
													</span>
													{
														client.id === clientId &&
														<span>(You)</span>
													}
													{
														(client.id !== clientId && client.status) === 0 ?
														<span className="text-warning"><span className="spin material-symbols-outlined">sync</span></span> :
														(client.id !== clientId && client.status) === 1 ?
														<span className="text-success"><span className="material-symbols-outlined">check_circle</span></span> :
														(client.id !== clientId && client.status) === 2 ?
														<span className="text-warning">Disconnecting</span> :
														(client.id !== clientId && client.status) === 3 &&
														<span className="text-danger">Disconnected</span>
													}
												</li>
											);
										} )
									}
								</ul>
							</div>
						</div>
					}
				</div>
			}
		</div>
	);
}

export default LobbyPanel;