import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Axios';

const initialState = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: [],
    counter: ['', ''], 
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

export const editArticle = createAsyncThunk('editArticle/fetchArticles', async ({ article, slug }) => {
  console.log(article, slug);
  const { data } = await axios.put(`https://blog.kata.academy/api/articles/${slug}`, {
    article,
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
    changeTags(state, action) {
      state.article.tagList = action.payload;
    },
    changeTag(state, action) {
      const { idx, value } = action.payload;
      state.article.tagList[idx] = value;
    }, 
    addCounter(state) {
      state.article.counter = [...state.article.counter, ''];
    },
    deleteCounter(state, action) {
      const idx = action.payload;
      
      if (state.article.tagList[idx]) {
        const newList = state.article.tagList.filter((_, index) => index !== idx);
        state.article.tagList = newList;
      }
      state.article.counter.shift();
    },
  },
});

export const { changeTags, changeTag, addCounter, deleteCounter } = articleReducer.actions;

export default articleReducer.reducer;
