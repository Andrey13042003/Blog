import { v4 as uuidv4 } from 'uuid';

import { useSelector, useDispatch } from 'react-redux';
import { changeTags, changeTag, addCounter, deleteCounter } from '../../Redux/Slices/ArticleSlice';

import classes from '../Tags/Tags.module.scss';

const Tags = ({ idx, register }) => {
  const dispatch = useDispatch();
  const tagList = useSelector((state) => state.article.article.tagList);
  const counter = useSelector((state) => state.article.article.counter);

  const handleChange = (e, idx) => {
    if (typeof tagList[idx] === 'undefined') {
      const newList = [...tagList, e.target.value];
      dispatch(changeTags(newList));
    } else {
      const value = e.target.value;
      dispatch(changeTag({ idx, value }));
    }
  };

  return (
    <div className={classes.tags} key={uuidv4()}> 
      <input
        onChange={(e) => handleChange(e, idx)}
        {...register(`tagList.${idx}.tag`)}
        id="tags"
        className={classes.tag_width}
        value={tagList[idx]}
        placeholder="Tag"
      ></input>
      <button className="btn btn-outline-danger" onClick={() => dispatch(deleteCounter(idx))}>
        Delete
      </button>
      {counter.length - 1 === idx && (
        <button className="btn btn-outline-primary" onClick={() => dispatch(addCounter())}>
          Add tag
        </button>
      )}
    </div>
  );
};

export default Tags;