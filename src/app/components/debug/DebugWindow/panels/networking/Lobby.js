import { useEffect } from "react";
import { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { setKey, setReadyState } from "@store/slices/networking/lobby";
import { addEntity, removeEntity } from "@store/slices/entities";

const Lobby = () => {

	const dispatch = useDispatch();
	const { networkEID, clientId } = useSelector( ( state ) => state.websocket );
	const { key, readyState, clients } = useSelector( ( state ) => state.lobby );
	const { peers } = useSelector( ( state ) => state.peers );

	const [ lobbyId, setLobbyId ] = useState( key || "" );

	const handleLobbyIdChange = ( event ) => {
		setLobbyId( event.target.value );
	}

	useEffect( () => {
		dispatch( setKey( lobbyId ) );
	}, [ lobbyId ] );

	const handleOnCreateOrJoin = () => {
		batch( () => {
			dispatch( addEntity( {
				eid : networkEID,
				components : [ {
					type : 'Lobby'
				} ]
			} ) );
		} );
	}

	useEffect( () => { 
		console.log( 'state change', peers, clients );
	}, [peers] )

	const handleOnLeave = () => {
		dispatch( removeEntity( networkEID ) );
	}

	return(
		<div className="card mb-3">
			<div className="">Lobby state: { readyState === 1 ? 'Active' : 'Idle' }</div>
			<hr className="mt-0" />
			<div className="input-group input-group-sm">
				<span className="input-group-text">Key</span>
				{
					readyState === 1 ? 
					<>
						<span className="input-group-text flex-fill">{ key }</span>
						<button className="d-flex btn btn-outline-light" onClick={ handleOnLeave }>Leave</button>
					</> :
					<>
						<input type="text" className="form-control text-uppercase" value={ lobbyId } onChange={ handleLobbyIdChange } />
						<button className="d-flex btn btn-outline-light" onClick={ handleOnCreateOrJoin }>{ lobbyId.length > 0 ? 'Join' : 'Create' }</button>
					</>
				}
			</div>
			{
				clients &&
				<div className="d-flex flex-column mt-3">
					{
						clients.length > 0 &&
						<span>Peer Connections:</span>
					}
					{ clients.map( ( client, index ) => {

						if( peers.includes( client ) )
						{
							return (
								<div key={ index } className="d-flex align-items-center" style={ { color : `${ peers.includes( client ) ? 'green' : 'grey' }` } }>
								{ client } { client === clientId && '(You)' }
								</div>
							)
						}
						else if( client !== clientId )
						{
							return (
								<div key={ index } className="d-flex align-items-center">
									<span className="spin material-symbols-outlined me-2">sync</span> Client connecting... <br/> { client }
								</div>
							)
						}
 					} ) }
				</div>
			}
		</div>
	);
}

export default Lobby;