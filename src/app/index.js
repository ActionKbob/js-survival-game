import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';

// import { BuildProviderTree } from '@utilities';

import store from '@store';

import '@styles/index.scss';

const App = () => {

	// const ContextProviders = BuildProviderTree( [
		
	// ] );

	return (
		<MemoryRouter>
			<Provider store={ store }>
				<Routes />
			</Provider>
		</MemoryRouter>
	);
}

export default App;
