import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	messages : []
}

const chatSlice = createSlice( {
	name : 'chat',
	initialState,
	reducers : {
		addMessage : ( state, action ) => {
			state.messages = [ ...state.messages, action.payload ];
			return state;
		}
	}
} );

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;