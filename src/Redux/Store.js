import { configureStore } from '@reduxjs/toolkit';

import pageReducer from './Slices/PageSlice';
import postReducer from './Slices/PostSlice';
import fullPostReducer from './Slices/FullPostSlice';
import loaderReducer from './Slices/LoaderSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
    page: pageReducer,
    full: fullPostReducer, 
    loader: loaderReducer, 
  },
});

export default store;
