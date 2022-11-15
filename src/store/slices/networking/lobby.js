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
			state.clients = action.payload.clients.map( client => {
				return {
					id : client,
					status : 0
				}
			} );
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
			state.clients = [ ...state.clients, {
				id : action.payload,
				status : 0
			} ];
			return state;
		},
		removeClient : ( state, action ) => {
			state.clients = state.clients.filter( ( client ) => client.id !== action.payload );
			return state;
		},
		setClientStatus : ( state, action ) => {
			const { clientId, status } = action.payload;
			state.clients = state.clients.map( client => { 
				if( client.id === clientId )
				{
					client.status = status;
				}
				return client;
			} );
			return state;
		}
	}
} );

export const { joinLobby, leaveLobby, setKey, setReadyState, addClient, removeClient, setClientStatus } = lobbiesSlice.actions;
export default lobbiesSlice.reducer;