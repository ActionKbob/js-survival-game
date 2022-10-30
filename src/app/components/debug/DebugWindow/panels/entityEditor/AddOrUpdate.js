import { addEntity } from "@store/slices/entities";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Component from "./Component";

const AddOrUpdate = () => {

	const dispatch = useDispatch();

	const initialState = {
		eid : '',
		components : []
	}

	const [ entityConfig, setEntityConfig ] = useState( initialState );

	const handleEntityUpdate = ( entity ) => {
		setEntityConfig( entity );
	}

	const handleEIDChange = ( event ) => {
		const entityCopy = { ...entityConfig };
		entityCopy.eid = event.target.value === -1 ? '' : event.target.value;

		handleEntityUpdate( entityCopy );
	}

	const handleAddComponent = ( event ) => {
		const entityCopy = { ...entityConfig };
		entityCopy.components.push( { type : '', props : [] } );

		handleEntityUpdate( entityCopy );
	}
	
	const handleApply = () => {

		const configCopy = { ...entityConfig };

		// Remove empty components
		configCopy.components = configCopy.components.filter( c => c.type !== '' );

		dispatch( addEntity( configCopy ) );
		clear();
	}

	const clear = () => {
		setEntityConfig( initialState );
	}

	return(
		<div className="card">
			<div className="label"></div>

			<div className="input-group input-group-sm">
				<span className="input-group-text">EID</span>
				<input type="number" className="form-control d-block" min={-1} value={ entityConfig.eid ? entityConfig.eid : '' } onChange={ handleEIDChange } placeholder="New entity" aria-label="EID" aria-describedby="eid-label" />
				<button className="btn btn-secondary d-flex" type="button" id="add-component-btn" onClick={ handleAddComponent }><span className="material-symbols-outlined">layers</span></button>
				<button className="btn btn-outline-light d-flex" type="button" id="clear-entity-btn" onClick={ clear }><span className="material-symbols-outlined">layers_clear</span></button>
			</div>

			<div>
				{/* Component List */}
				{
					entityConfig.components.map( ( component, index ) => {
						return(
							<div key={ index } className="mt-3">
								<Component id={ index } entityConfig={ entityConfig } onUpdate={ handleEntityUpdate } />
							</div>
						);
					} )
				}
			</div>

			{ 
				entityConfig.components.length > 0 && 
				<button className="btn btn-primary d-flex justify-content-center mt-3 w-100" type="button" onClick={ handleApply }>
					<span className="material-symbols-outlined">add</span>
				</button>
			}
		</div>
	);
}

export default AddOrUpdate;