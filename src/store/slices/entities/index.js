import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	add : [],
	remove : []
}

const entitiesSlice = createSlice( {
	name : 'entities',
	initialState,
	reducers : {
		addEntity : ( state, action ) => {
			state.add = [ ...state.add, action.payload ];
			return state;
		},
		removeEntity : ( state, action ) => {
			state.remove = [ ...state.remove, action.payload ];
			return state;
		},
		clean : ( state ) => {
			state.add = [];
			state.remove = [];
			return state;
		}
	}
} );

export const { addEntity, removeEntity, clean } = entitiesSlice.actions;
export default entitiesSlice.reducer;