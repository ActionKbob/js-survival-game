import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEndpoint } from "@store/slices/networking/websocket";
import { addEntity, removeEntity } from "@store/slices/entities";

const WebSockets = () => {

	const { endpoint, readyState, networkEID, clientId } = useSelector( ( state ) => state.websocket );
	const dispatch = useDispatch();

	const [ tempEndpoint, setTempEndpoint ] = useState( endpoint );

	const handleEndpointChange = ( event ) => {
		setTempEndpoint( event.target.value );
	}

	useEffect( () => {
		dispatch( setEndpoint( tempEndpoint ) );
	 }, [ tempEndpoint ] );

	const handleOnConnect = () => {
		dispatch( addEntity(
			{
				components : [
					{
						type : 'Socket'
					}
				]
			}
		) );
	}

	const handleOnDisconnect = () => {
		dispatch( removeEntity( networkEID ) );
	}

	return(
		<div className="card mb-3">
			<div className="d-flex justify-content-between mb-2">
				<div>
					Server state: <span style={ { color : readyState === 1 ? 'green' : 'red' } }>{ readyState === 1 ? 'Connected' : 'Disconnected' }</span>
				</div>
				{
					readyState === 1 &&
					networkEID !== null &&
					<span>Entity ID: { networkEID }</span>
				}
			</div>
			<div className="input-group input-group-sm">
				<span className="input-group-text">Endpoint</span>
				{
					readyState === 1 ?
					<>
						<span className="input-group-text flex-fill">{ endpoint }</span>
						<button className="d-flex btn btn-outline-light" onClick={ handleOnDisconnect }><span className="material-symbols-outlined">cloud_off</span></button>
					</> :
					<>
						<input type="text" className="form-control" value={ tempEndpoint } onChange={ handleEndpointChange } />
						<button className="d-flex btn btn-outline-light" onClick={ handleOnConnect }><span className="material-symbols-outlined">cloud_queue</span></button>
					</>
				}
			</div>
			{
				readyState === 1 &&
				<span className="mt-2">Client ID: { clientId }</span>
			}
		</div>
	)
}

export default WebSockets;