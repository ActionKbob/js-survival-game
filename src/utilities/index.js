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