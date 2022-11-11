export const BuildProviderTree = ( providers ) => {
	if( providers.length === 1 )
		return providers[0];
	
	const ProviderA = providers.shift();
	const ProviderB = providers.shift();

	return BuildProviderTree( [
		( { children } ) => {
			<ProviderA>
				<ProviderB>
					{ children }
				</ProviderB>
			</ProviderA>
		},
		...providers
	] );
}

export function EventEmitter(){
	this.handlers = new Map();

	this.attach = ( id, handler ) => {
		
		if( this.handlers.has( id ) )
			this.handlers.set( id, [ ...this.handlers.get(id), handler ] );
		else
			this.handlers.set( id, [ handler ] );
	}

	this.detach = ( id, handler ) => {

		if( this.handlers.has( id ) )
			this.handlers.set( id, [ ...this.handlers.get(id) ].filter( h => h !== handler ) );
	}

	this.emit = ( id, payload ) => {
		if( this.handlers.has( id ) )
			this.handlers.get( id ).forEach( h => h( payload ) );
	}
}