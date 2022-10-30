import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	endpoint : 'localhost:6969',
	readyState : 3,
	networkEntity : null,
	clientId : null
}

const webSocketSlice = createSlice( {
	name : 'websocket',
	initialState,
	reducers : {
		setEndpoint : ( state, action ) => {
			state.endpoint = action.payload;
		},
		setReadyState : ( state, action ) => {
			state.readyState = action.payload;
		},
		setNetworkEntity : ( state, action ) => {
			state.networkEntity = action.payload;
		},
		setClientId : ( state, action ) => {
			state.clientId = action.payload;
		}
	}
} );

export const { setEndpoint, setReadyState, setNetworkEntity, setClientId } = webSocketSlice.actions;
export default webSocketSlice.reducer;

