import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	fps : 0,
	entityCount: 0,
	mousePosition: {
		x: 0,
		y: 0,
		worldX : 0,
		worldY : 0
	}
}

const debugSlice = createSlice( {
	name : 'debug',
	initialState,
	reducers: {
		setFPS : ( state, action ) => {
			state.fps = Math.round( action.payload );
			return state;
		},
		setEntityCount : ( state, action ) => {
			console.log(action.payload )
			state.entityCount = parseInt( action.payload );
			return state;
		},
		setMousePosition : ( state, action ) => {
			state.mousePosition = action.payload;
			return state;
		}
	}
} );

export const { setFPS, setEntityCount, setMousePosition } = debugSlice.actions;
export default debugSlice.reducer;