import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	key : null,
	clients : [],
	readyState : 3,
	isHost : false
}

const lobbiesSlice = createSlice( {
	name : 'lobbies',
	initialState,
	reducers : {
		joinLobby : ( state, action ) => {
			state.readyState = 1;
			state.key = action.payload.key;
			state.clients = action.payload.clients;
			console.log(state.clients)
			return state;
		},
		leaveLobby : ( state ) => {
			state.readyState = 3;
			state.key = null;
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