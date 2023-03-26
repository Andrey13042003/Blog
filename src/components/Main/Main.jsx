import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getPostInfo } from '../../Redux/Slices/PostSlice';
import { setLoader } from '../../Redux/Slices/LoaderSlice';
import Spiner from '../Spiner';
import Error from '../Error';
import PostItem from '../PostItem';

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
    
  let items = data.items.map((item, idx) => <PostItem key={idx} item={item} />);

  return (
    <main> 
      <ul className={classes.list}>{items}</ul>
    </main>
  );
};

export default Main;