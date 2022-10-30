import { createSlice } from "@reduxjs/toolkit"

const initialState = {
}

const playerSlice = createSlice( {
	name: "player",
	initialState,
	reducers: {
		setCharacter: (state, action) => {
			state.character = action.payload;
			return state;
		}
	}
} );

export const { setCharacter } = playerSlice.actions;
export default playerSlice.reducer;