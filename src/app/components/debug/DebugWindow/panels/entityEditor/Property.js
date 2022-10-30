const Property = ( { config, onUpdate } ) => {

	const handleChange = ( event ) => {
		const configCopy = { ...config };
		configCopy.value = event.target.value;
		
		onUpdate( configCopy.key, configCopy.value );
	}

	return (
		<div className="input-group input-group-sm mt-3">
			<span className="input-group-text w-50 d-flex justify-content-center" id="prop-label">{ config.key }</span>
			<input className="form-control d-block" type="number" value={ config.value } onChange={ handleChange } aria-label="prop" aria-describedby="prop-label" />
		</div>
	)
}

export default Property;