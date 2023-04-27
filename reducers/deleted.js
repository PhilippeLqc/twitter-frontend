import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const deletedSlice = createSlice({
  name: 'deleted',
  initialState,
  reducers: {
    deletetweet: (state, action) => {
      state.value = !state.value
    },
  },
});

export const { deletetweet} = deletedSlice.actions;
export default deletedSlice.reducer;
