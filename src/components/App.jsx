import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { useEffect } from 'react';
import SignUp from '../Pages/SignUp/SignUp';
import FullPostItem from '../Pages/FullPostItem/FullPostItem';
import SignIn from '../Pages/SignIn/SignIn';
import EditProfile from '../Pages/EditProfile/EditProfile';
import ShowPage from '../Pages/ShowPage/ShowPage';
import CreatePage from '../Pages/CreateArticle/CreateArticle';
import EditArticle from '../Pages/EditArticle/EditArticle';
import { getUserInfo } from '../Redux/Slices/UserSlice';
import { setToken } from '../Redux/Slices/UserSlice';
import Header from './Header/Header';
import Error from './Error/Error';

import classes from './App.module.scss';

const App = () => {
  const fullPost = useSelector((state) => state.full.item);
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  let path;

  useEffect(() => {
    async function getSomeData() {
      await dispatch(getUserInfo());
      await dispatch(setToken(token));
    }
    token && getSomeData();
  }, [token]);

  if (Object.keys(fullPost) !== 0) {
    path = `/articles/${fullPost.slug}`;
  }

  return (
    <div className={classes.App}>
      <Router> 
        <Header />
        <main className={classes.main}>
          <Routes>
            <Route path="/" element={<ShowPage />} />
            <Route path="/article" element={<ShowPage />} />
            <Route path={path} element={<FullPostItem item={fullPost} />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/new-article" element={<CreatePage />} />
            <Route path={'/articles/:slug/edit'} element={<EditArticle />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main> 
      </Router> 
    </div> 
  );
};
 
export default App;