import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../Axios';

const initialState = {
  user: {
    username: null,
  },
  token: '',
};

export const getUserInfo = createAsyncThunk('getUserInfo/fetchArticles', async () => {
  const { data } = await axios.get('https://blog.kata.academy/api/user');

  return data;
});

export const authUser = createAsyncThunk('authUser/fetchArticles', async ({ user }) => {
  const { data } = await axios.post('https://blog.kata.academy/api/users/login', {
    user,
  });

  return data;
});

export const editProfile = createAsyncThunk('editProfile/fetchProfile', async ({ user }) => {
  const { data } = await axios.put('https://blog.kata.academy/api/user', {
    user,
  });

  return data;
});

export const userInfo = createSlice({
  name: 'saveUser',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    logOut(state) {
      localStorage.removeItem('token');
      state.token = '';
      state.user.username = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user.username = action.payload.user.username;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      console.log(action, 'authUser');
      state.user.username = action.payload.user.username;
      state.token = action.payload.user.token;
    });
    builder.addCase(authUser.rejected, (state) => {
      state.user.username = null;
      state.token = '';
      state.error = true;
    });
  },
});

export const { setToken, logOut } = userInfo.actions;

export default userInfo.reducer;
