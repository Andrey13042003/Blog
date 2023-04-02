import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { useState, useEffect } from 'react';

import { deleteFullPost } from '../../Redux/Slices/FullPostSlice';
import { logOut } from '../../Redux/Slices/UserSlice';

import classes from './Header.module.scss';

const Header = () => {
  const [img, setImg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { username } = useSelector((state) => state.user.user);
  
  useEffect(() => {
    token && username && getImage();
  }, [token]);
  
  const goOut = () => dispatch(logOut());
  const createArticle = () => navigate('/', { replace: true });

  const getImage = async () => {
    const res = await fetch(`https://blog.kata.academy/api/profiles/${username}`);
    const body = await res.json();
    setImg(body.profile.image);
    
    return body;
  };

  const out = (
    <>
      <li>
        <Link to="/sign-in" type="button" className="btn btn-outline-success">
          Sign In
        </Link>
      </li>
      <li>
        <Link to="/sign-up" type="button" className="btn btn-outline-success">
          Sign Up
        </Link>
      </li>
    </>
  );

  const signIn = (
    <>
      <li>
        <Link to="/new-article" className="btn btn-outline-success" onClick={() => createArticle()}>
          Create article
        </Link>
      </li> 
      <li>
        <Link to="/profile" className={classes.link}>
          {username}
        </Link>
        <Link to="/profile" className={classes.link}>
          <Avatar size={40} className={classes.avatar} src={img} />
        </Link>
      </li> 
      <li>
        <Link to="/" className="btn btn-outline-dark" onClick={() => goOut()}>
          Log Out
        </Link>
      </li> 
    </>
  );

  return (
    <header className={classes.header}> 
      <Link to="/article" className={classes.link} onClick={() => dispatch(deleteFullPost())}> 
        <h4 className={classes.title}>Realworld Blog</h4>
      </Link>
      <ul className={classes.list}>{token ? signIn : out}</ul>
    </header> 
  );
};

export default Header;