import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import pageReducer from './Slices/PageSlice';
import postReducer from './Slices/PostSlice';
import fullPostReducer from './Slices/FullPostSlice';
import { getApi } from './GetApi';
import userInfo from './Slices/UserSlice';
import articleReducer from './Slices/ArticleSlice';

//const ANDREY_LOX = true;

const store = configureStore({
  reducer: {
    [getApi.reducerPath]: getApi.reducer,
    post: postReducer,
    page: pageReducer,
    full: fullPostReducer,
    user: userInfo,
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getApi.middleware),
});

setupListeners(store.dispatch);

export default store;
