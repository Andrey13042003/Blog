import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getPostInfo } from '../../Redux/Slices/PostSlice';
import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import PostItem from '../PostItem/PostItem';

import classes from './Main.module.scss';


const Main = () => {
  const data = useSelector((state) => state.post);
  const page = useSelector((state) => state.page.page);

  const dispatch = useDispatch();

  useEffect(() => {
    const offset = (page - 1) * 5;
    dispatch(getPostInfo(offset));
  }, [page]);

  if (data.status === 'loading') {
    return <Spiner />;
  }

  if (data.status === 'rejected') {
    return <Error />;
  }
    
  let items = data.items.map((item) => <PostItem key={uuidv4()} item={item} />);

  return <ul className={classes.list}>{items}</ul>;
};

export default Main;