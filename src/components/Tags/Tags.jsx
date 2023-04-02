import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import classes from '../../Pages/CreateArticle/CreateArticle.module.scss';

export let tagList = [];

const Tags = () => {
  const [counter, setCounter] = useState(['', '']);

  const addTag = (e) => {
    e.preventDefault();
    setCounter((prevCount) => [...prevCount, '']);
  };

  const deleteTag = (e, idx) => {
    e.preventDefault();
    const newCounter = counter.filter((_, index) => idx !== index);
    if (tagList[idx]) {
      tagList.splice(idx);
    }
    console.log(tagList);
    setCounter(newCounter);
  };

  const handleChange = (e, idx) => {
    if (typeof tagList[idx] === 'undefined') {
      console.log('undefined');
      tagList.push(e.target.value);
    } else {
      tagList[idx] = e.target.value;
    }
    console.log(tagList); 
  };

  return counter.map((_, idx) => {
    return (
      <div className={classes.tags} key={uuidv4()}> 
        <input
          onChange={(e) => handleChange(e, idx)}
          id="tags"
          className={classes.input + ' ' + classes.tag_width}
          value={tagList[idx]}
          placeholder="Tag"
        ></input>
        <button className="btn btn-outline-danger" onClick={(e) => deleteTag(e, idx)}>
          Delete
        </button>
        <button className="btn btn-outline-primary" onClick={(e) => addTag(e)}>
          Add tag
        </button>
      </div>
    );
  });
};

export default Tags;

/*setValue((prevValue) => {
  return {...prevValue, uuidv4(): e.target.value};
});*/