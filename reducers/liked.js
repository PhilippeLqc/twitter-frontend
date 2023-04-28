import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: false,
};

export const likedSlice = createSlice({
	name: 'liked',
	initialState,
	reducers: {
		addLiked: (state, action) => {
			state.value = !state.value;
		},
	},
});

export const { addLiked } = likedSlice.actions;
export default likedSlice.reducer;
