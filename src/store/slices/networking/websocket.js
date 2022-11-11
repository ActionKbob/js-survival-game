import { createSlice } from "@reduxjs/toolkit";
import { SOCKET_STATES } from "@networking/enums";

const initialState = {
	endpoint : 'localhost:6969',
	status : SOCKET_STATES[3],
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
		setStatus : ( state, action ) => {
			state.status = action.payload;
			return state;
		},
		setClientId : ( state, action ) => {
			state.clientId = action.payload;
			return state;
		}	
	}
} );

export const { setEndpoint, setStatus, setClientId } = webSocketSlice.actions;
export default webSocketSlice.reducer;