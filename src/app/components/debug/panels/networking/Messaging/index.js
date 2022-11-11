import { useSelector } from "react-redux";
import { useNetwork } from "@app_contexts/networking";
import { useRef } from "react";

const MessagingPanel = () => {

	const inputRef = useRef( null );
	const { peers } = useSelector( ( state ) => state.peers );
	const { broadcast } = useNetwork();

	const handleSend = () => {
		const message = inputRef.current.value;
		broadcast( message );
		inputRef.current.value = "";
	}
	
	return(
		<>
		{
			peers.length > 0 &&
			<div className="debug-panel">
				<div className="input-group input-group-sm">
				<input ref={ inputRef } type="text" className="form-control" placeholder="Send message..." />
				<button className="btn btn-primary d-flex" onClick={ handleSend }>
					<span className="material-symbols-outlined">send</span>
				</button>
				</div>
			</div>
		}
		</>
	);
}

export default MessagingPanel;