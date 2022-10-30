import { configureStore } from '@reduxjs/toolkit';

import entities from '@store/slices/entities';
import config from '@store/slices/config';
import player from '@store/slices/player';
import websocket from '@store/slices/networking/websocket';
import lobby from '@store/slices/networking/lobby';
import peers from '@store/slices/networking/peers';
import messages from '@store/slices/networking/messages';
import debug from '@store/slices/debug';

const store = configureStore( {
	reducer : {
		entities,
		config,
		player,
		websocket,
		lobby,
		peers,
		messages,
		debug
	}
} );

export default store;