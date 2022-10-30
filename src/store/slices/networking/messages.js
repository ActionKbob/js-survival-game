import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

let messageCount = 0;

const messagesSlice = createSlice( {
	name : 'messages',
	initialState,
	reducers : {
		recieveMessage : ( state, action ) => {
			const { type, payload } = action.payload;
			state = [ ...state, { id : messageCount++, answered : false, type, payload } ];
			return state;
		},
		answerMessage : ( state, action ) => {
			state = state.map( ( message ) => {
				if( message.id === action.payload ) {
					message.answered = true;
				}
				return message;
			} );
		},
		clearAnsweredMessages : ( state ) => {
			state = state.filter( ( message ) => { return message.answered === false } );
			return state;
		},
		clearMessages : ( state ) => {
			state = [];
			return state;
		}
	}
} );

export const { recieveMessage, answerMessage, clearAnsweredMessages, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
