import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Tags from '../../components/Tags/Tags';

import classes from '../ArticleForm/ArticleForm.module.scss';

const ArticleForm = ({ onSubmit, article }) => {
  const counter = useSelector((state) => state.article.article.counter);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: article?.title,
      description: article?.description, 
      body: article?.body,
      tagList: article?.tagList ? article.tagList.map((el) => ({ tag: el })) : null,
    },
  });

  const ShowTags = () => {
    return counter.map((_, idx) => {
      return <Tags key={idx} idx={idx} register={register} />;
    });
  };

  return (
    <form className={classes.create} onSubmit={handleSubmit(onSubmit)}> 
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
        <label htmlFor="body">Text</label>
        <textarea
          {...register('body', { required: true })}
          className={classes.input + ' ' + classes.textarea}
          id="body"
          placeholder="Text"
        ></textarea>
      </div>
      <div className={classes.label}> 
        <label htmlFor="tags">Tags</label>
        <ShowTags />
      </div>
      <input type="submit" className={classes.send} value="Send" />
    </form>
  );
};

export default ArticleForm;