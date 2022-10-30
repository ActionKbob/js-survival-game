import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	gameType : 0
}

const configSlice = createSlice( {
	name : 'config',
	initialState,
	reducers : {
		setGameType : ( state, action ) => {
			state.gameType = action.payload;
		}
	}
} );

export const { setGameType } = configSlice.actions;
export default configSlice.reducer;