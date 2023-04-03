import { Avatar } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import DeleteForm from '../DeleteForm/DeleteForm';

import classes from './FullPostItem.module.scss';

const FullPostItem = ({ item }) => {
  const { username } = useSelector((state) => state.user.user);

  const { title, author, description, tagList, createdAt, body, slug, favoritesCount } = item;

  let tags; 
  let isAuth = author.username === username;

  const data = new Date(createdAt).toString();
  const month = data.slice(4, 10);
  const year = data.slice(10, 15);

  if (tagList) {
    tags = tagList.map((tag) => (
      <button key={uuidv4()} className={classes.tag}>
        {tag}
      </button>
    ));
  } 

  return (
    <article className={classes.element}>
      <article className={classes.element__header}> 
        <div className={classes.title}> 
          <div> 
            <h4 className={classes.postname}>{title}</h4>
            {tags && <div className={classes.tags}>{tags}</div>}
          </div>
          <div> 
            <button className={classes.like}>
              <Icon icon="ant-design:heart-outlined" width="20" height="20" />
            </button> 
            <span className={classes.counter}>{favoritesCount}</span>
          </div>
        </div>
        <div className={classes.profile}> 
          <div className={classes.info}> 
            <div> 
              {author.username && <h5 className={classes.name}>{author.username}</h5>}
              <span className={classes.data}>
                {month}, {year}
              </span>
            </div>
            <Avatar src={author.image} size={40} />
          </div>
          {isAuth && (
            <div className={classes.btn}> 
              <DeleteForm slug={slug} />
              <Link to={`/articles/${slug}/edit`}>
                <button className="btn btn-outline-success">Edit</button>
              </Link> 
            </div>
          )}
        </div>
      </article>
      <ReactMarkdown>{description}</ReactMarkdown>
      <ReactMarkdown>{body}</ReactMarkdown>
    </article>
  );
};

export default FullPostItem;


