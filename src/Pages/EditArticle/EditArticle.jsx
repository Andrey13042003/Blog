import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetFullPostQuery } from '../../Redux/GetApi';

import { editArticle } from '../../Redux/Slices/ArticleSlice';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

import classes from '../../components/ArticleForm/ArticleForm.module.scss';

const EditArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { slug } = useParams();
  let userInfo;
  if (slug) {
    const { data } = useGetFullPostQuery(slug);
    userInfo = data;
  }

  const onSubmit = async (current) => {
    const { title, description, body } = current;
    dispatch(editArticle({ article: { title, description, body }, slug }));
    navigate('/', { replace: true });
  };

  if (userInfo) {
    return (
      <div className={classes.parent}> 
        <h4 className={classes.title}>Edit article</h4>
        <ArticleForm onSubmit={onSubmit} article={userInfo.article} />
      </div>
    );
  }
};

export default EditArticle;

//data.article...
/*dispatch(editArticle({ newArticle: { title, description, body } }, slug));*/
