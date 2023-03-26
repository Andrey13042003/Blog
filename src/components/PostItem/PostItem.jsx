import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import { Avatar } from 'antd';
import { setFullPost } from '../../Redux/Slices/FullPostSlice';

import classes from './PostItem.module.scss';

const PostItem = ({ item }) => {
  const dispatch = useDispatch();

  const { author, title, description, tagList, createdAt, slug, body } = item;
  let path = `/articles/${slug}`;
  let tags,
    counter = 12;

  if (tagList) {
    tags = tagList.map((tag) => (
      <button key={uuidv4()} className={classes.tag}>
        {tag}
      </button>
    ));
  } 

  const data = new Date(createdAt).toString();
  const month = data.slice(4, 10);
  const year = data.slice(10, 15);

  return (
    <li className={classes.element}>
      <article className={classes.element__header}> 
        <div className={classes.title}> 
          <div> 
            <Link to={path} className={classes.link} onClick={() => dispatch(setFullPost(item))}>
              <h4 className={classes.postname}>{title}</h4>
            </Link>
            {tags && <div className={classes.tags}>{tags}</div>}
          </div>
          <button className={classes.like}>🤍 {counter}</button>
        </div>
        <div className={classes.profile}> 
          <div> 
            {author.username && <h5 className={classes.name}>{author.username}</h5>}
            <span className={classes.data}>
              {month}, {year}
            </span>
          </div>
          <Avatar src={author.image} size={40} />
        </div>
      </article>
      <article className={classes.text}> 
        <p>{body}</p>
        <p>{description}</p>
      </article>
    </li>
  );
};

export default PostItem;

/* ❤️🤍 */