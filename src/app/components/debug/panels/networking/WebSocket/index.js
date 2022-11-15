import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEndpoint } from "@store/slices/networking/websocket";
import { useNetwork } from "@app_contexts/networking";
import { SOCKET_STATES } from "@networking/enums";

const WebSocketPanel = () => {

	const dispatch = useDispatch();

	const { connect, disconnect } = useNetwork();

	const { endpoint, status, clientId } = useSelector( state => state.websocket );
	const [ endpointValue, setEndpointValue ] = useState( endpoint );
	
	const handleEndpointChange = ( _event ) => {
		dispatch( setEndpoint( _event.target.value ) );
		setEndpointValue( _event.target.value );
	}

	const handleOnConnect = () => {
		connect();
	}

	const handleOnDisconnect = () => {
		disconnect();
	}

	return(
		<div className="card">
			<div className="input-group input-group-sm">
				
				<span className="input-group-text">Endpoint</span>
				{
					status === SOCKET_STATES[1] ?
					<>
						<span className="input-group-text flex-fill text-muted">{ endpointValue }</span>
						<button className="d-flex btn btn-danger" onClick={ handleOnDisconnect }><span className="material-symbols-outlined">cloud_off</span></button>
					</> :
					<>
						<input type="text" className="form-control" value={ endpointValue } onChange={ handleEndpointChange } />
						<button className="d-flex btn btn-outline-light" onClick={ handleOnConnect }><span className="material-symbols-outlined">cloud_queue</span></button>
					</>
				}
			</div>
		</div>
	);
}

export default WebSocketPanel;