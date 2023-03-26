import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar } from 'antd';
import { deleteFullPost } from '../../Redux/Slices/FullPostSlice';

import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  //В зависимости от того, залогинились мы или нет, будем выводить signIn или Out
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
        <button className="btn btn-outline-success">Create article</button>
      </li> 
      <li>
        <span>John Doe</span>
        <Avatar size={40} className={classes.avatar} />
      </li> 
      <li>
        <button className="btn btn-outline-dark">Log Out</button>
      </li> 
    </>
  );

  return (
    <header className={classes.header}> 
      <Link to="/article" className={classes.link} onClick={() => dispatch(deleteFullPost())}> 
        <h4 className={classes.title}>Realworld Blog</h4>
      </Link>
      <ul className={classes.list}> 
        {signIn}
      </ul>
    </header> 
  );
};

export default Header;