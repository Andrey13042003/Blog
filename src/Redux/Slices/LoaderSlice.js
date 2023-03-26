import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loader: true,
};

const loaderReducer = createSlice({
  name: 'loader', 
  initialState, 
  reducers: {
    setLoader(state, action) {
      state.loader = action.payload;
    }
  },
});

export const { setLoader } = loaderReducer.actions;

export default loaderReducer.reducer;

