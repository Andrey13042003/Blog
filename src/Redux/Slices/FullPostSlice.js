import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: {},
};

const fullPostReducer = createSlice({
  name: 'fullPost', 
  initialState, 
  reducers: {
    setFullPost(state, action) {
      state.item = action.payload;
    }, 
    deleteFullPost(state) {
      state.item = {};
    }
  }
});

export const { setFullPost, deleteFullPost } = fullPostReducer.actions;

export default fullPostReducer.reducer;