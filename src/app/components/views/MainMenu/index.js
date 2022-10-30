import { Link } from "react-router-dom";

const MainMenuView = () => {
	


	return(
		<div id="main-menu" className="h-100">
			<div className="d-flex justify-content-center align-items-center">
				<div>
					<h1>Main Menu</h1>
					<Link to="/game-select">Game Select</Link>
				</div>
			</div>
		</div>
	);
}

export default MainMenuView;