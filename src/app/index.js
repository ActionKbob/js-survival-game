import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { BuildProviderTree } from '@utilities';
import { NetworkProvider } from '@app_contexts/networking';

import Views from '@app_views';

import store from '@store';

import '@styles/index.scss';

const App = () => {

	const ContextProviders = BuildProviderTree( [
		NetworkProvider,
	] );

	return (
		<MemoryRouter>
			<Provider store={ store }>
				<ContextProviders>
					<Views />
				</ContextProviders>
			</Provider>
		</MemoryRouter>
	);
}

export default App;
