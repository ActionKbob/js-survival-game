import { useNavigate } from "react-router-dom";
import { character_configs } from "@game/configs/characters";
import { useDispatch } from "react-redux";
import { setCharacter } from "@store/slices/player";

const CharacterSelectView = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const handleCharacterSelexct = ( index ) => {
		dispatch( setCharacter( character_configs[ index ] ) );
		navigate( "/game" );
	}
	
	return(
		<div>
			<div className="d-flex flex-column justify-content-center align-items-center">
			{/* <Link to={ `/game` }>Gamego</Link> */}
			{
				character_configs &&
				character_configs.map( ( config, index ) => {
					return(
						<div key={ index }>
							<button className="btn" onClick={ () => handleCharacterSelexct( index ) }>{ config.name }</button>
						</div>
					)
				} )
			}
			</div>
		</div>
	)
}

export default CharacterSelectView;