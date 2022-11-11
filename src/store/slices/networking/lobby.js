import { createSlice } from "@reduxjs/toolkit"
import { LOBBY_STATES } from "@networking/enums";

const initialState = {
	key : '',
	clients : [],
	status : LOBBY_STATES[3]
}

const lobbiesSlice = createSlice( {
	name : 'lobbies',
	initialState,
	reducers : {
		joinLobby : ( state, action ) => {
			state.key = action.payload.key;
			state.status = LOBBY_STATES[1];
			state.clients = action.payload.clients;
			return state;
		},
		leaveLobby : ( state ) => {
			state.key = '';
			state.status = LOBBY_STATES[3];
			state.clients = [];
			return state;
		},
		setKey : ( state, action ) => {
			state.key = action.payload;
			return state;
		},
		addClient : ( state, action ) => {
			state.clients = [ ...state.clients, action.payload ];
			return state;
		},
		removeClient : ( state, action ) => {
			state.clients = state.clients.filter( ( client ) => client !== action.payload );
			return state;
		}
	}
} );

export const { joinLobby, leaveLobby, setKey, setReadyState, addClient, removeClient } = lobbiesSlice.actions;
export default lobbiesSlice.reducer;