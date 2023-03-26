import { Avatar } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';

import classes from './FullPostItem.module.scss';

const FullPostItem = ({ item }) => {
  const { title, author, description, tagList, createdAt, body } = item;
  let tags; 

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
    <article className={classes.element}>
      <article className={classes.element__header}> 
        <div className={classes.title}> 
          <div> 
            <h4 className={classes.postname}>{title}</h4>
            {tags && <div className={classes.tags}>{tags}</div>}
          </div>
          <button className={classes.like}>🤍 12</button>
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
      <ReactMarkdown>{body}</ReactMarkdown>
      <ReactMarkdown>{description}</ReactMarkdown>
    </article>
  );
};

export default FullPostItem;