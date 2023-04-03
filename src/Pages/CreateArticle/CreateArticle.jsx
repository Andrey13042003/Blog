import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createArticle } from '../../Redux/Slices/ArticleSlice';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

import classes from '../../components/ArticleForm/ArticleForm.module.scss';

const CreatePage = () => {
  const dispatch = useDispatch();
  const { tagList } = useSelector((state) => state.article.article);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { title, description, body } = data; 
    dispatch(createArticle({ article: { title, description, body, tagList } }));
    navigate('/', { replace: true });
  };

  return (
    <div className={classes.parent}> 
      <h4 className={classes.title}>Create new article</h4>
      <ArticleForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreatePage;
