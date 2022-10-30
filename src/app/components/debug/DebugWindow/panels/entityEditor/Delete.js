import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeEntity } from "@store/slices/entities";

const Delete = () => {

	const dispatch = useDispatch();

	const [ deleteEID, setDeleteEID ] = useState( "" );

	const handleEIDChange = ( event ) => {
		setDeleteEID( event.target.value );
	}

	const handleDelete = () => {
		dispatch( removeEntity( deleteEID ) );
		setDeleteEID( "" );
	}

	return (
		<div className="card mb-3">
			<div>
				<div className="input-group input-group-sm">
					<span className="input-group-text" id="eid-label">EID</span>
					<input className="form-control d-block" placeholder="Delete Entity" type="number" min={ 0 } value={ deleteEID } onChange={ handleEIDChange } aria-label="EID" aria-describedby="eid-label" />
				</div>	
			</div>
			{
				deleteEID !== "" &&
				<button className="btn btn-danger d-flex justify-content-center mt-3 w-100" type="button" onClick={ handleDelete }>
					<span className="material-symbols-outlined">delete_forever</span>
				</button>
			}
		</div>
	);
}

export default Delete;