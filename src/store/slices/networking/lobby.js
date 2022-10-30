import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	key : null,
	clients : [],
	readyState : 3
}

const lobbiesSlice = createSlice( {
	name : 'lobbies',
	initialState,
	reducers : {
		joinLobby : ( state, action ) => {
			state.readyState = 1;
			state.key = action.payload.key;
			state.clients = action.payload.clients;
		},
		leaveLobby : ( state ) => {
			state.readyState = 3;
			state.key = null;
			state.clients = [];
		},
		setKey : ( state, action ) => {
			state.key = action.payload;
		},
		setReadyState : ( state, action ) => {
			state.readyState = action.payload;
		},
		addClient : ( state, action ) => {
			state.clients = [ ...state.clients, action.payload ];
		},
		removeClient : ( state, action ) => {
			state.clients = state.clients.filter( ( client ) => client !== action.payload );
		}
	}
} );

export const { joinLobby, leaveLobby, setKey, setReadyState, addClient, removeClient } = lobbiesSlice.actions;
export default lobbiesSlice.reducer;