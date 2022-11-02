import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	endpoint : 'localhost:6969',
	readyState : 3,
	networkEID : null,
	clientId : null
}

const webSocketSlice = createSlice( {
	name : 'websocket',
	initialState,
	reducers : {
		setEndpoint : ( state, action ) => {
			state.endpoint = action.payload;

			return state;
		},

		connect : ( state, action ) => {
			state.readyState = 1;
			state.networkEID = action.payload.networkEID;
			state.clientId = action.payload.clientId;

			return state;
		},
		disconnect : ( state ) => {
			state.readyState = 3;
			state.networkEntity = null;
			state.clientId = null;

			return state;
		}
	}
} );

export const { setEndpoint, connect, disconnect } = webSocketSlice.actions;
export default webSocketSlice.reducer;

