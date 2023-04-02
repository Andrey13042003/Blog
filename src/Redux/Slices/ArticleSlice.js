import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Axios';

const initialState = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
  favorite: {},
};

export const createArticle = createAsyncThunk('createArticle/fetchArticles', async ({ article }) => {
  const { data } = await axios.post('https://blog.kata.academy/api/articles', {
    article,
  });

  return data;
});

export const deleteArticle = createAsyncThunk('deleteArticle/fetchArticles', async (slug) => {
  const { data } = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`);

  return data;
});

export const editArticle = createAsyncThunk('editArticle/fetchArticles', async ({ newArticle }, slug) => {
  const { data } = await axios.put(`https://blog.kata.academy/api/articles/${slug}`, {
    newArticle,
  });

  return data;
});

export const isFavorite = createAsyncThunk('isFavorite/fetchFavorite', async (slug) => {
  const { data } = await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`);

  return data;
});

export const unFavorite = createAsyncThunk('unFavorite/fetchUnFavorite', async (slug) => {
  const { data } = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`);

  return data;
});

const articleReducer = createSlice({
  name: 'article',
  initialState,
  reducers: {
  },
});

export const { changeFavorite } = articleReducer.actions;

export default articleReducer.reducer;
