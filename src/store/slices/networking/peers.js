import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	peers : []
}

const peersSlice = createSlice( {
	name : 'peers',
	initialState,
	reducers : {
		addPeer : ( state, action ) => {
			state.peers = [ ...state.peers, action.payload ];
			console.log( state.peers );
		},
		removePeer : ( state, action ) => {
			state.peers = state.peers.filter( ( peer ) => peer !== action.payload );
		}
	}
} );

export const { addPeer, removePeer } = peersSlice.actions;
export default peersSlice.reducer;
