import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Main from '../../components/Main/Main';
import Pagination from '../../components/Pagination/Pagination';

import { setPage } from '../../Redux/Slices/PageSlice';

const ShowPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post);

  const changePage = (page) => dispatch(setPage(page));
  
  return (
    <>
      <Main />
      {data.status == 'resolved' && <Pagination changePage={changePage} />}
    </>
  );
};

export default ShowPage;