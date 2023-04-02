import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: '',
};

export const getPostInfo = createAsyncThunk('post/getPostInfo', async function (offset, { rejectWithValue }) {
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`);

    if (!res.ok) {
      throw new Error();
    }

    const body = await res.json();

    return body;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const postReducer = createSlice({
  name: 'post',
  initialState,
  extraReducers: {
    [getPostInfo.pending]: (state) => {
      state.status = 'loading';
    },
    [getPostInfo.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.items = action.payload.articles;
    },
    [getPostInfo.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});

export default postReducer.reducer;
