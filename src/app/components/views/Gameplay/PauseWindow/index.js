import '@styles/components/pauseWindow.scss';
import { Link } from "react-router-dom";

const PauseWindow = () => {
	return(
		<div id="pause-window" className={ `d-flex flex-column` }>
			<div className="display-1">Paused</div>
			<Link to="/" className="btn btn-primary">Return to Main Menu</Link>
		</div>
	)
}

export default PauseWindow;	