import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import SplashView from './Splash';
import GameplayView from './Gameplay';


const Views = () => {
	return(
		<Routes>
			<Route path="/" element={ <Layout /> }>
				<Route index element={ <SplashView /> } />
				<Route path="gameplay" element={ <GameplayView /> } />
			</Route>
		</Routes>
	);
}

export default Views;