import game_types from '@game/configs/gameTypes';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setGameType } from '@store/slices/config';

const GameSelectView = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const handleGameTypeSelect = ( type ) => {
		dispatch( setGameType( type ) );
		navigate( `/characterSelect` );
	}

	return(
		<div id="game-select">
			<div className="d-flex flex-column justify-content-center align-items-center">
			{ game_types && game_types.map( ( config, index ) => {
				return(
					<div key={ index }>
						<button className='btn' onClick={ () => handleGameTypeSelect( index ) }>{ config.name }</button>
					</div>
				)
			} ) }
			</div>
		</div>
	);
}

export default GameSelectView;