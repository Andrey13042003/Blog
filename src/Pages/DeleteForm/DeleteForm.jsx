import { message, Popconfirm } from 'antd';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteArticle } from '../../Redux/Slices/ArticleSlice';

const DeleteForm = ({ slug }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirm = () => {
    dispatch(deleteArticle(slug));
    navigate('/', { replace: true });
    message.success('Post deleted');
  };

  const cancel = () => message.error('Post has not been deleted');

  return (
    <Popconfirm
      title="Delete article"
      description="Are you sure to delete this article?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      placement="right"
    >
      <button className="btn btn-outline-danger">Delete</button>
    </Popconfirm>
  );
};

export default DeleteForm;