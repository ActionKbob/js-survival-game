import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { BuildProviderTree } from '@utilities';
import { NetworkProvider } from '@app_contexts/networking';

import Layout from '@app_views/Layout';
import SplashView from '@app_views/Splash';

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
					<Routes>
						<Route path="/" element={ <Layout /> }>
							<Route index element={ <SplashView /> } />
						</Route>
					</Routes>
				</ContextProviders>
			</Provider>
		</MemoryRouter>
	);
}

export default App;
