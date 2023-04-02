import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createArticle } from '../../Redux/Slices/ArticleSlice';
import Tags from '../../components/Tags/Tags';
import { tagList } from '../../components/Tags/Tags';

import classes from './CreateArticle.module.scss';

const CreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const { title, description, text } = data; 
    if (data) {
      dispatch(createArticle({ article: { title, description, text, tagList } }));
      navigate('/', { replace: true });
    }
    reset();
  };

  return (
    <form className={classes.create} onSubmit={handleSubmit(onSubmit)}> 
      <h4 className={classes.title}>Create new article</h4>
      <div className={classes.label}> 
        <label htmlFor="title">Title</label>
        <input {...register('title', { required: true })} className={classes.input} id="title" placeholder="Title" />
      </div>
      <div className={classes.label}> 
        <label htmlFor="description">Short description</label>
        <input
          {...register('description', { required: true })}
          className={classes.input}
          id="description"
          placeholder="Description"
        />
      </div>
      <div className={classes.label}> 
        <label htmlFor="text">Text</label>
        <textarea
          {...register('text', { required: true })}
          className={classes.input + ' ' + classes.textarea}
          id="text"
          placeholder="Text"
        ></textarea>
      </div>
      <div className={classes.label}> 
        <label htmlFor="tags">Tags</label>
        <Tags />
      </div>
      <input type="submit" className={classes.send} value="Send" />
    </form>
  );  
};

export default CreatePage;

/*{...register(uuidv4(), {
  validate: (value) => {
    if (value != '') {
      console.log(value);
      tagList.push(value);
    }
  },
})}*/