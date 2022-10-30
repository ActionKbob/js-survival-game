import { useRoutes } from "react-router-dom";
// import MainMenuView from "@components/views/MainMenu";
import GameSelectView from "@components/views/GameSelect";
import CharacterSelectView from "@components/views/CharacterSelect";
import GameplayView from "@components/views/Gameplay";

const Routes = () => {
	return useRoutes( [
		// {
		// 	path : "/",
		// 	element : <MainMenuView />
		// },
		{
			// Change to not root when further development is done
			path : "/",
			element : <GameSelectView />
		},
		{
			path : "/characterSelect",
			element : <CharacterSelectView />
		},
		{
			path : "/game",
			element : <GameplayView />
		}
	] );
}

export default Routes;