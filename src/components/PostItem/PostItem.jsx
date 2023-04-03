import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

import { v4 as uuidv4 } from 'uuid';
import { Avatar } from 'antd';
import { useState } from 'react';
import { setFullPost } from '../../Redux/Slices/FullPostSlice';
import { isFavorite, unFavorite } from '../../Redux/Slices/ArticleSlice';

import classes from './PostItem.module.scss';

const PostItem = ({ item }) => {
  const { author, title, tagList, createdAt, slug, body, favoritesCount, favorited } = item;

  const [data, setData] = useState({ favorited, favoritesCount });
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  let path = `/articles/${slug}`;
  let tags;

  const date = new Date(createdAt).toString();
  const month = date.slice(4, 10);
  const year = date.slice(10, 15);

  const showLike =
    data.favorited && token ? (
      <Icon icon="ant-design:heart-filled" color="red" width="20" height="20" />
    ) : (
      <Icon icon="ant-design:heart-outlined" width="20" height="20" />
    );

  if (tagList) {
    tags = tagList.map((tag) => (
      <button key={uuidv4()} className={classes.tag}>
        {tag}
      </button>
    ));
  } 

  const checkFavorite = async () => {
    if (!token) return;
    let info;

    if (!data.favorited) info = await dispatch(isFavorite(slug));
    else info = await dispatch(unFavorite(slug));

    const favorited = info.payload.article.favorited;
    const favoritesCount = info.payload.article.favoritesCount;
    setData({ favorited, favoritesCount });
  };
  
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
          <div> 
            <button className={classes.like} onClick={() => checkFavorite()}>
              {showLike}
            </button>
            <span className={classes.counter}>{data.favoritesCount}</span>
          </div>
        </div>
        <div className={classes.profile}> 
          <div> 
            {author.username && <h5 className={classes.name}>{author.username}</h5>}
            <span className={classes.date}>
              {month}, {year}
            </span>
          </div>
          <Avatar src={author.image} size={40} />
        </div>
      </article>
      <article className={classes.text}> 
        <p>{body}</p>
      </article>
    </li>
  );
};

export default PostItem;