import { useSelector } from 'react-redux';

import { Pagination as Pag } from 'antd';

const Pagination = ({ changePage }) => {
  const page = useSelector((state) => state.page.page);

  return <Pag defaultCurrent={page} total={50} onChange={changePage} />;
};

export default Pagination;