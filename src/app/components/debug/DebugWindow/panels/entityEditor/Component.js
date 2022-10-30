import componentMap from "@game/logic/components";
import { useState } from "react";
import Property from "./Property";

const Component = ( { id, entityConfig, onUpdate } ) => {

	const [ componentConfig, setComponentConfig ] = useState( entityConfig.components[ id ] );
	
	const handleChange = ( event ) => {
	
		const componentCopy = { ...componentConfig };
		componentCopy.type = event.target.value;

		componentCopy.props = [];
		Object.keys( componentMap[ componentCopy.type ] ).forEach( ( key ) => {
			componentCopy.props.push( { key, value : 0 } );
		} );

		
		setComponentConfig( componentCopy );
		
		entityConfig.components[ id ] = componentCopy;
		onUpdate( entityConfig );
	}

	const handleDelete = ( event ) => {
		const entityCopy = { ...entityConfig };
		entityCopy.components.splice( id, 1 );

		onUpdate( entityCopy );
	}

	const handleUpdateProperty = ( key, value ) => {
		const componentCopy = { ...componentConfig };

		componentCopy.props = componentCopy.props.map( ( prop ) => {
			if ( prop.key === key ) {
				prop.value = value;
			}
			return prop;
		} );
		
		setComponentConfig( componentCopy );
		
		entityConfig.components[ id ] = componentCopy;
		onUpdate( entityConfig );
	}

	return(
		<div className="card mb-3">
			<div className="input-group input-group-sm">
				<select className="form-select" value={ componentConfig.type } onChange={ handleChange }>
					<option value={""} disabled>Component Type...</option>
					{
						Object.keys( componentMap ).map( ( key, index ) => {
							return( <option key={ index } value={ key }>{ key }</option> );
						} )
					}
				</select>
				<button className="d-flex btn btn-outline-danger" type="button" id="delete-component-btn" onClick={ handleDelete }>
					<span className="material-symbols-outlined">delete_sweep</span>
				</button>
			</div>

			<div>
				{/* Property List */}
				{
					componentConfig.props?.map( ( prop, index ) => {
						return( <Property key={ index } config={ prop } onUpdate={ handleUpdateProperty } /> );
					} )
				}
			</div>
		</div>
	);
}

export default Component;