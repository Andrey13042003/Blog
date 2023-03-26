import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { setPage } from '../Redux/Slices/PageSlice';

import Header from './Header';
import Main from './Main';
import Pagination from './Pagination';
import FullPostItem from './FullPostItem';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Error from './Error';

import classes from './App.module.scss';

const App = () => {
  const status = useSelector((state) => state.post.status);
  const fullPost = useSelector((state) => state.full.item);
  const dispatch = useDispatch();

  let path;

  const changePage = (page) => dispatch(setPage(page));

  const joinComponents = (component) => {
    return (
      <>
        <Header />
        {component}
      </>
    );
  };

  if (Object.keys(fullPost) !== 0) {
    path = `/articles/${fullPost.slug}`;
  }

  let condition =
    status !== 'loading' && Object.keys(fullPost).length === 0 && status !== 'rejected' ? (
      <Pagination changePage={changePage} />
    ) : null;

  return (
    <div className={classes.App}>
      <Router> 
        <Routes>
          <Route path="/" element={joinComponents(<Main />)} />
          <Route path="/article" element={joinComponents(<Main />)} />
          <Route path={path} element={joinComponents(<FullPostItem item={fullPost} />)} />
          <Route path="/sign-up" element={joinComponents(<SignUp />)} />
          <Route path="sign-in" element={joinComponents(<SignIn />)} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router> 
      {condition}
    </div> 
  );
};
 
export default App;